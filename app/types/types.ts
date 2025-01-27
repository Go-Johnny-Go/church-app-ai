export interface Church {
    id: number;
    photo: string;
    name: string;
    phone: string;
    email: string;
    status: "active" | "inactive";
  }
  
  export interface Event {
    id: number;
    name: string;
    date: string;
    location: string;
    status: "upcoming" | "ongoing" | "completed";
  }
  
  export interface Project {
    id: number;
    name: string;
    budget: string;
    status: "in progress" | "completed";
  }
  
  export interface User {
    id: number;
    name: string;
    role: string;
    email: string;
    status: "active" | "inactive";
  }
  
  export interface TableColumn<T> {
    key: keyof T;
    label: string;
    render?: (value: any, item: T) => JSX.Element;
  }
  
  export interface TableActions {
    view?: (id: number) => void;
    edit?: (id: number) => void;
    delete?: (id: number) => void;
  }
  export interface Column {
    key: string;
    header: string;
  }
  
  export interface TableProps {
    data: any[];
    columns: Column[];
  }