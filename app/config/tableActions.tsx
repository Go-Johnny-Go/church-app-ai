import { TableActions } from "../types/types";

export const tableActions: TableActions = {
  view: (id) => alert(`Viewing item with ID: ${id}`),
  edit: (id) => alert(`Editing item with ID: ${id}`),
  delete: (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      alert(`Deleted item with ID: ${id}`);
    }
  }
};
