export interface Task{
    name:string;
    priority:'High' | 'Medium' | 'Low';
    dueDate:string;
    completed:boolean;
}