import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empty } from '../empty/empty';

export type GvTableSortDirection = 'asc' | 'desc' | null;
export type GvTableFilterType = 'text' | 'select' | 'number-range' | 'date-range';

export interface GvTableFilterOption {
  label: string;
  value: any;
}

export interface GvTableColumnFilter {
  type: GvTableFilterType;
  options?: GvTableFilterOption[];
}

export interface GvTableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
  filter?: GvTableColumnFilter;
}

export interface GvTablePageSizeOption {
  label: string;
  value: number;
}

type GvNumberRangeFilterValue = {
  min?: number | null;
  max?: number | null;
};

type GvDateRangeFilterValue = {
  from?: string | null;
  to?: string | null;
};

type GvActiveFilterChip<T> = {
  key: string;
  label: string;
  valueLabel: string;
  column?: GvTableColumn<T>;
  kind: 'global' | 'column';
};

@Component({
  selector: 'gv-table',
  standalone: true,
  imports: [CommonModule, FormsModule, Empty],
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table<T extends Record<string, any>> implements OnChanges {
  @Input() columns: GvTableColumn<T>[] = [];
  @Input() rows: T[] = [];

  @Input() filterable = false;
  @Input() showColumnFilters = true;
  @Input() collapsibleFilters = true;
  @Input() filtersExpanded = false;
  @Input() filterPlaceholder = 'Search...';

  @Input() pagination = true;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: GvTablePageSizeOption[] = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
  ];

  @Input() rowLimit: number | null = null;

  @Input() minBodyHeight = 320;
  @Input() loading = false;
  @Input() emptyText = 'No records found.';
  @Input() emptyTitle = 'No records found';
  @Input() emptyDescription = 'There are no rows to display right now.';
  @Input() loadingTitle = 'Loading data';
  @Input() loadingDescription = 'Please wait while the table content is loaded.';

  @Input() className = '';
  @Input() striped = false;
  @Input() hover = true;
  @Input() compact = false;

  filterTerm = '';
  currentPage = 1;

  sortKey: string | null = null;
  sortDirection: GvTableSortDirection = null;

  columnFilters: Record<string, any> = {};
  areFiltersOpen = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows'] || changes['rowLimit'] || changes['columns']) {
      this.initializeColumnFilters();
      this.ensureValidPage();
    }

    if (changes['filtersExpanded']) {
      this.areFiltersOpen = !!this.filtersExpanded;
    }
  }

  get processedRows(): T[] {
    let data = [...(this.rows ?? [])];

    if (this.rowLimit !== null && this.rowLimit >= 0) {
      data = data.slice(0, this.rowLimit);
    }

    data = this.applyGlobalSearch(data);
    data = this.applyColumnFilters(data);

    if (this.sortKey && this.sortDirection) {
      data.sort((a, b) => {
        const aValue = this.getCellValue(a, this.sortKey!);
        const bValue = this.getCellValue(b, this.sortKey!);

        const result = this.compareValues(aValue, bValue);
        return this.sortDirection === 'asc' ? result : -result;
      });
    }

    return data;
  }

  get pagedRows(): T[] {
    if (!this.pagination) return this.processedRows;

    const start = (this.currentPage - 1) * this.pageSize;
    return this.processedRows.slice(start, start + this.pageSize);
  }

  get totalRows(): number {
    return this.processedRows.length;
  }

  get totalPages(): number {
    if (!this.pagination) return 1;
    return Math.max(1, Math.ceil(this.totalRows / this.pageSize));
  }

  get startRow(): number {
    if (!this.totalRows) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRow(): number {
    if (!this.totalRows) return 0;
    return Math.min(this.currentPage * this.pageSize, this.totalRows);
  }

  get tableClass(): string {
    return [
      'gv-table',
      this.striped ? 'gv-table--striped' : '',
      this.hover ? 'gv-table--hover' : '',
      this.compact ? 'gv-table--compact' : '',
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get filterColumns(): GvTableColumn<T>[] {
    return (this.columns ?? []).filter((column) => !!column.filter);
  }

  get hasColumnFilters(): boolean {
    return this.showColumnFilters && this.filterColumns.length > 0;
  }

  get searchableColumns(): GvTableColumn<T>[] {
    return (this.columns ?? []).filter((column) => column.searchable);
  }

  get shouldShowFiltersPanel(): boolean {
    if (!this.hasColumnFilters) return false;
    if (!this.collapsibleFilters) return true;
    return this.areFiltersOpen;
  }

  get activeFilterCount(): number {
    return this.activeFilterChips.length;
  }

  get activeFilterChips(): GvActiveFilterChip<T>[] {
    const chips: GvActiveFilterChip<T>[] = [];

    const globalTerm = this.filterTerm.trim();
    if (globalTerm) {
      chips.push({
        key: '__global__',
        label: 'Search',
        valueLabel: globalTerm,
        kind: 'global',
      });
    }

    for (const column of this.filterColumns) {
      const key = this.getFilterKey(column);
      const filterType = column.filter?.type;
      const filterValue = this.columnFilters[key];

      switch (filterType) {
        case 'text': {
          const value = String(filterValue ?? '').trim();
          if (value) {
            chips.push({
              key,
              label: column.label,
              valueLabel: value,
              column,
              kind: 'column',
            });
          }
          break;
        }

        case 'select': {
          if (filterValue !== '' && filterValue != null) {
            const optionLabel =
              column.filter?.options?.find((opt) => opt.value === filterValue)?.label ??
              String(filterValue);

            chips.push({
              key,
              label: column.label,
              valueLabel: optionLabel,
              column,
              kind: 'column',
            });
          }
          break;
        }

        case 'number-range': {
          const min = filterValue?.min;
          const max = filterValue?.max;

          if (min != null || max != null) {
            let valueLabel = '';
            if (min != null && max != null) valueLabel = `${min}–${max}`;
            else if (min != null) valueLabel = `≥ ${min}`;
            else valueLabel = `≤ ${max}`;

            chips.push({
              key,
              label: column.label,
              valueLabel,
              column,
              kind: 'column',
            });
          }
          break;
        }

        case 'date-range': {
          const from = filterValue?.from;
          const to = filterValue?.to;

          if (from || to) {
            let valueLabel = '';
            if (from && to) valueLabel = `${from} → ${to}`;
            else if (from) valueLabel = `From ${from}`;
            else valueLabel = `To ${to}`;

            chips.push({
              key,
              label: column.label,
              valueLabel,
              column,
              kind: 'column',
            });
          }
          break;
        }
      }
    }

    return chips;
  }

  get resolvedEmptyDescription(): string {
    return this.emptyDescription?.trim() || this.emptyText;
  }

  onFilterChange(): void {
    this.currentPage = 1;
  }

  onColumnFilterChange(): void {
    this.currentPage = 1;
  }

  onPageSizeChange(value: string | number): void {
    this.pageSize = Number(value);
    this.currentPage = 1;
    this.ensureValidPage();
  }

  toggleFilters(): void {
    if (!this.hasColumnFilters) return;
    this.areFiltersOpen = !this.areFiltersOpen;
  }

  clearFilterChip(chip: GvActiveFilterChip<T>): void {
    if (chip.kind === 'global') {
      this.filterTerm = '';
      this.currentPage = 1;
      return;
    }

    const column = chip.column;
    if (!column) return;

    const key = this.getFilterKey(column);

    switch (column.filter?.type) {
      case 'text':
      case 'select':
        this.columnFilters[key] = '';
        break;
      case 'number-range':
        this.columnFilters[key] = { min: null, max: null };
        break;
      case 'date-range':
        this.columnFilters[key] = { from: null, to: null };
        break;
    }

    this.currentPage = 1;
  }

  toggleSort(column: GvTableColumn<T>): void {
    if (!column.sortable) return;

    const key = String(column.key);

    if (this.sortKey !== key) {
      this.sortKey = key;
      this.sortDirection = 'asc';
    } else if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else if (this.sortDirection === 'desc') {
      this.sortKey = null;
      this.sortDirection = null;
    } else {
      this.sortDirection = 'asc';
    }

    this.currentPage = 1;
  }

  getSortDirection(column: GvTableColumn<T>): GvTableSortDirection {
    return this.sortKey === String(column.key) ? this.sortDirection : null;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  clearAllFilters(): void {
    this.filterTerm = '';
    this.columnFilters = {};
    this.initializeColumnFilters();
    this.currentPage = 1;
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByColumn = (_: number, column: GvTableColumn<T>) => String(column.key);
  trackByChip = (_: number, chip: GvActiveFilterChip<T>) => chip.key;

  getCellValue(row: T, key: keyof T | string): any {
    return String(key)
      .split('.')
      .reduce((acc: any, part: string) => acc?.[part], row);
  }

  getAlignClass(column: GvTableColumn<T>): string {
    switch (column.align) {
      case 'center':
        return 'gv-table__cell--center';
      case 'end':
        return 'gv-table__cell--end';
      default:
        return 'gv-table__cell--start';
    }
  }

  getFilterKey(column: GvTableColumn<T>): string {
    return String(column.key);
  }

  getFilterType(column: GvTableColumn<T>): GvTableFilterType | null {
    return column.filter?.type ?? null;
  }

  getTextFilterValue(column: GvTableColumn<T>): string {
    return this.columnFilters[this.getFilterKey(column)] ?? '';
  }

  setTextFilterValue(column: GvTableColumn<T>, value: string): void {
    this.columnFilters[this.getFilterKey(column)] = value;
    this.onColumnFilterChange();
  }

  getSelectFilterValue(column: GvTableColumn<T>): any {
    return this.columnFilters[this.getFilterKey(column)] ?? '';
  }

  setSelectFilterValue(column: GvTableColumn<T>, value: any): void {
    this.columnFilters[this.getFilterKey(column)] = value;
    this.onColumnFilterChange();
  }

  getNumberRangeFilterValue(column: GvTableColumn<T>): GvNumberRangeFilterValue {
    return this.columnFilters[this.getFilterKey(column)] ?? { min: null, max: null };
  }

  setNumberRangeFilterMin(column: GvTableColumn<T>, value: string | number | null): void {
    const key = this.getFilterKey(column);
    const current = this.getNumberRangeFilterValue(column);

    this.columnFilters[key] = {
      ...current,
      min: value === '' || value === null ? null : Number(value),
    };

    this.onColumnFilterChange();
  }

  setNumberRangeFilterMax(column: GvTableColumn<T>, value: string | number | null): void {
    const key = this.getFilterKey(column);
    const current = this.getNumberRangeFilterValue(column);

    this.columnFilters[key] = {
      ...current,
      max: value === '' || value === null ? null : Number(value),
    };

    this.onColumnFilterChange();
  }

  getDateRangeFilterValue(column: GvTableColumn<T>): GvDateRangeFilterValue {
    return this.columnFilters[this.getFilterKey(column)] ?? { from: null, to: null };
  }

  setDateRangeFilterFrom(column: GvTableColumn<T>, value: string | null): void {
    const key = this.getFilterKey(column);
    const current = this.getDateRangeFilterValue(column);

    this.columnFilters[key] = {
      ...current,
      from: value || null,
    };

    this.onColumnFilterChange();
  }

  setDateRangeFilterTo(column: GvTableColumn<T>, value: string | null): void {
    const key = this.getFilterKey(column);
    const current = this.getDateRangeFilterValue(column);

    this.columnFilters[key] = {
      ...current,
      to: value || null,
    };

    this.onColumnFilterChange();
  }

  private initializeColumnFilters(): void {
    const nextFilters: Record<string, any> = {};

    for (const column of this.filterColumns) {
      const key = this.getFilterKey(column);
      const existing = this.columnFilters[key];

      switch (column.filter?.type) {
        case 'text':
          nextFilters[key] = existing ?? '';
          break;
        case 'select':
          nextFilters[key] = existing ?? '';
          break;
        case 'number-range':
          nextFilters[key] = existing ?? { min: null, max: null };
          break;
        case 'date-range':
          nextFilters[key] = existing ?? { from: null, to: null };
          break;
      }
    }

    this.columnFilters = nextFilters;
  }

  private applyGlobalSearch(data: T[]): T[] {
    const term = this.filterTerm.trim().toLowerCase();
    if (!term) return data;

    const searchableColumns = this.searchableColumns;
    if (!searchableColumns.length) return data;

    return data.filter((row) =>
      searchableColumns.some((column) => {
        const value = this.getCellValue(row, column.key);
        return String(value ?? '')
          .toLowerCase()
          .includes(term);
      }),
    );
  }

  private applyColumnFilters(data: T[]): T[] {
    if (!this.filterColumns.length) return data;

    return data.filter((row) =>
      this.filterColumns.every((column) => {
        const key = this.getFilterKey(column);
        const filterType = column.filter?.type;
        const cellValue = this.getCellValue(row, column.key);
        const filterValue = this.columnFilters[key];

        switch (filterType) {
          case 'text': {
            const term = String(filterValue ?? '')
              .trim()
              .toLowerCase();
            if (!term) return true;

            return String(cellValue ?? '')
              .toLowerCase()
              .includes(term);
          }

          case 'select': {
            if (filterValue === '' || filterValue == null) return true;
            return cellValue === filterValue;
          }

          case 'number-range': {
            const min = filterValue?.min;
            const max = filterValue?.max;

            if ((min == null || min === '') && (max == null || max === '')) {
              return true;
            }

            const numericValue = Number(cellValue);
            if (Number.isNaN(numericValue)) return false;

            if (min != null && min !== '' && numericValue < min) return false;
            if (max != null && max !== '' && numericValue > max) return false;

            return true;
          }

          case 'date-range': {
            const from = filterValue?.from;
            const to = filterValue?.to;

            if (!from && !to) return true;
            if (!cellValue) return false;

            const cellDate = new Date(cellValue).getTime();
            if (Number.isNaN(cellDate)) return false;

            if (from) {
              const fromDate = new Date(from).setHours(0, 0, 0, 0);
              if (cellDate < fromDate) return false;
            }

            if (to) {
              const toDate = new Date(to).setHours(23, 59, 59, 999);
              if (cellDate > toDate) return false;
            }

            return true;
          }

          default:
            return true;
        }
      }),
    );
  }

  private compareValues(a: any, b: any): number {
    if (a == null && b == null) return 0;
    if (a == null) return -1;
    if (b == null) return 1;

    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    const aDate = new Date(a).getTime();
    const bDate = new Date(b).getTime();
    const aLooksLikeDate = !Number.isNaN(aDate) && typeof a === 'string';
    const bLooksLikeDate = !Number.isNaN(bDate) && typeof b === 'string';

    if (aLooksLikeDate && bLooksLikeDate) {
      return aDate - bDate;
    }

    return String(a).localeCompare(String(b), undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  }

  private ensureValidPage(): void {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
  }
}
