import { WorkItemFields } from "./workItemField";
import { WorkItemRelation } from "./workItemRelation";

export interface WorkItem {
    id: number;
    fields: WorkItemFields;
    relations?: WorkItemRelation[];
  }