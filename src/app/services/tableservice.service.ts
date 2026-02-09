import { Injectable } from '@angular/core';

interface TableItem {
  id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TableService<T extends TableItem> {

  tableData: any[] = [];        // SAFE DEFAULT
  originalData: any[] = [];     // keeps original for filters/search
  order: string = 'ASC';
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor() {}

  /* INITIALIZE TABLE */
  initialize(initialData: T[] = [], perPage: number = 10) {
    this.originalData = initialData || [];
    this.tableData = [...this.originalData];
    this.itemsPerPage = perPage;
    this.currentPage = 1;
  }

  /* SORTING */
  sortData(col: string) {
    if (!this.tableData) return;

    const [parentCol, childCol] = col.split('.');

    this.tableData = this.tableData.sort((a, b) => {
      const aValue = childCol ? a?.[parentCol]?.[childCol] : a?.[col];
      const bValue = childCol ? b?.[parentCol]?.[childCol] : b?.[col];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.order === 'ASC'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return this.order === 'ASC'
        ? (aValue || 0) - (bValue || 0)
        : (bValue || 0) - (aValue || 0);
    });

    this.order = this.order === 'ASC' ? 'DSC' : 'ASC';
  }

  /* DELETE */
  deleteItem(id: number) {
    this.tableData = this.tableData.filter((item: any) => item.id !== id);
    this.originalData = this.originalData.filter((item: any) => item.id !== id);
  }

  /* GLOBAL SEARCH */
  search(term: string) {
    if (!term) {
      this.tableData = [...this.originalData];
    } else {
      this.tableData = this.originalData.filter((item: any) =>
        Object.values(item).some((value: any) =>
          String(value).toLowerCase().includes(term.toLowerCase())
        )
      );
    }
    this.currentPage = 1;
  }

  /* FILTER SYNC SUPPORT */
  updateTableData(data: any[]) {
    this.originalData = data || [];
    this.tableData = [...this.originalData];
    this.currentPage = 1;
  }

  /* PAGINATION */
  paginate(page: number) {
    this.currentPage = page;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /* PAGINATED DATA */
  get paginatedData() {
    if (!this.tableData || this.tableData.length === 0) return [];

    const indexOfLastItem = this.currentPage * this.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.itemsPerPage;
    return this.tableData.slice(indexOfFirstItem, indexOfLastItem);
  }

  get totalPages() {
    return Math.ceil((this.tableData?.length || 0) / this.itemsPerPage);
  }

  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex() {
    return Math.min(
      this.startIndex + this.itemsPerPage - 1,
      (this.tableData?.length || 0) - 1
    );
  }

  get totalData() {
    return this.tableData?.length || 0;
  }

  /* CHECKBOX SELECT */
  handleSelect(event: any) {
    const { checked, name } = event.target;

    if (name === 'select-all') {
      this.tableData = this.tableData.map((item: any) => ({
        ...item,
        isChecked: checked,
      }));
    } else {
      this.tableData = this.tableData.map((item: any) =>
        item.title == name ? { ...item, isChecked: checked } : item
      );
    }
  }
}
