export interface Contact {
    _id?: string; // Это будет ID, если он существует
    name: string;
    email: string;
    phone: {
      mobile: string;
      work?: string;
    };
  }
  