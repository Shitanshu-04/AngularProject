import { WorkItemRelAttribute } from "./workItemRelAttribute";

export interface WorkItemRelation {
    rel: string;
    url: string;
    attributes: WorkItemRelAttribute
  }