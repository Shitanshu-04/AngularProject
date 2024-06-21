import { WorkItemAssignedTo } from "./workItemAssignedTo";

export interface WorkItemFields {
    'System.Id': number;
    'System.Title': string;
    'System.WorkItemType': string;
    'System.State': string;
    'System.AssignedTo': WorkItemAssignedTo;
  }