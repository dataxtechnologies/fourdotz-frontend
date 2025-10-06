import { Injectable } from '@angular/core';
interface TableItem {
  id?:number;
}
@Injectable({
  providedIn: 'root'
})
export class TableService <T extends TableItem> {
[x: string]: any;
  tableData!: any[];
  order: string = 'ASC';
  itemsPerPage!: number;
  currentPage: number = 1;

  constructor() { }

  initialize(initialData: T[], perPage: number = 10) {
    this.tableData = initialData;
    this.itemsPerPage = perPage;
  }

  sortData(col: string) {
    const colString = String(col);
    const [parentCol, childCol] = colString.split('.');

    if (this.order === 'ASC') {
      this.tableData = this.tableData.sort((a, b) => {
        const aValue = childCol ? a[parentCol][childCol] : a[colString];
        const bValue = childCol ? b[parentCol][childCol] : b[colString];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.toLowerCase() > bValue.toLowerCase() ? 1 : -1;
        } else {
          return aValue > bValue ? 1 : -1;
        }
      });
      this.order = 'DSC';
    } else {
      this.tableData = this.tableData.sort((a, b) => {
        const aValue = childCol ? a[parentCol][childCol] : a[colString];
        const bValue = childCol ? b[parentCol][childCol] : b[colString];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.toLowerCase() < bValue.toLowerCase() ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      this.order = 'ASC';
    }
  }

  deleteItem(id: number) {
    this.tableData = this.tableData.filter((item: any) => item.id !== id);
  }

  search(term: string) {
    const filteredData = this.tableData.filter((item: any) =>
      Object.values(item).some((value: any) => String(value).toLowerCase().includes(term.toLowerCase()))
    );
    this.tableData = filteredData;
    this.currentPage = 1;
  }

  paginate(page: number) {
    this.currentPage = page;
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

  get paginatedData() {
    const indexOfLastItem = this.currentPage * this.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.itemsPerPage;
    return this.tableData.slice(indexOfFirstItem, indexOfLastItem);
  }

  get totalPages() {
    return Math.ceil(this.tableData.length / this.itemsPerPage);
  }

  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.itemsPerPage - 1, this.tableData.length - 1);
  }

  get totalData() {
    return this.tableData.length;
  }

  handleSelect(event: any) {
    const { checked, name } = event.target;
    if (name === 'select-all') {
      this.tableData = this.tableData.map((item: any) => ({ ...item, isChecked: checked }));
    } else {
      this.tableData = this.tableData.map((item: any) =>
        item.title == name ? { ...item, isChecked: checked } : item
      );
    }
  }
}
