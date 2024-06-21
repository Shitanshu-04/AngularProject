import { Component, Input } from '@angular/core';
import { WorkItem } from '../Models/workItem';
import { ListWorkItem } from '../Models/listWorkItem';

@Component({
  selector: 'app-work-item-list',
  templateUrl: './work-item-list.component.html',
  styleUrls: ['./work-item-list.component.css']
})
export class WorkItemListComponent {
  /**
   * Input property used to get the list of work items form the parent component work item details.
   */
  @Input() lstWorkItems: ListWorkItem = {value:[],count:0};;
}
