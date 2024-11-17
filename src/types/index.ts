export interface Game {
    id: string;
    name: string;
    image: string;
    slots: number;
    active: boolean;
  }
  
  export interface Announcement {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'success';
    active: boolean;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    gameId: string;
    avatar?: string;
    supercoins: number;
    walletBalance: number;
  }