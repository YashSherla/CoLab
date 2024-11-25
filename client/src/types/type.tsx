export interface Task {
  _id: string;
  name: string;
  description: string;
  deadline: string;  // or Date if you parse it
  bounty: string;
  status: string;    // You might want to make this more specific with a union type
  assignedUsers: string[];
  projectId: string;
  comment: any[];    // You might want to define a Comment interface
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  __v: number;
}
export interface UserProfile {
  _id:string,
  username:string,
  email:string,
  active:string,
  createdAt: string; 
  updatedAt: string;
  __v: number;
}