import { Component, OnInit } from '@angular/core';
import { AzureService } from '../Services/azure.service';
import { WorkItem } from '../Models/workItem';
import { ListWorkItem } from '../Models/listWorkItem';

@Component({
  selector: 'app-work-item-details',
  templateUrl: './work-item-details.component.html',
  styleUrls: ['./work-item-details.component.css']
})
export class WorkItemDetailsComponent {
  workItemId: string = "";
  selectedItem: string = "Children";
  selectedValue: string | null = null;
  workItem: WorkItem;
  lstWorkItems:WorkItem[] = [];
  workItemList: ListWorkItem = {value:[],count:0};
  showErrorMessage:boolean = false
  errorMessage:string = "";
  errorMessages: string [] = [];

  /**
   * constructor of the class used to initialise work item.
   */
  constructor(private azureService: AzureService) {
    this.workItem = { id: 0, fields: { "System.Id": 0, "System.Title": " ", "System.State": " ", "System.WorkItemType": " ", "System.AssignedTo": { displayName: " ", id: 0, uniqueName: " " } }, relations: [{ rel: " ", url: " ",attributes: {name: " "} }] }
  }


  /**
   * called when the submit button is pressed on the form.
   * @param form 
   */
  onSubmit(form: any): void {
    this.workItemId = form.value.textInput;
    this.selectedValue = form.value.selectedOption;
    this.errorMessage = "";
    this.errorMessages = [];
    this.showErrorMessage = false;
    console.log('the written text is', this.workItemId);
    console.log('the selected option is', this.selectedValue);
    if (this.selectedValue === 'projectName')
      {
        this.workItemId = "";
        this.fetchWorkItemsList();
      }
      
    else
      this.fetchData();
      
  }

  /**
   * Fetches a single work item and their children.
   */
  fetchData() {
    if(!Number.isNaN(parseInt(this.workItemId)))
      {
        this.azureService.getWorkItem(Number(this.workItemId)).subscribe(
          workItemsData => {
            this.workItem = workItemsData;
            this.showChildren()
          },
          error => {
            this.showErrorMessage = true;
            console.error('Error fetching work items:', error);
            this.errorMessage = 'unable to fetch the Work Item.Please try again.';
            this.errorMessages.push(this.errorMessage);
          }
        )
      }
      else{
        this.showErrorMessage = true;
            this.errorMessage = 'Please Enter number in workItem details';
            this.errorMessages.push(this.errorMessage);
      }  
  }

  /**
   * Fteches a list of work items in a given project.
   */
  fetchWorkItemsList() {
    this.azureService.getWorkItemsId().subscribe(
      data => {
        const workItemIds = data.workItems.map((item: any) => item.id);
        this.azureService.getWorkItems(workItemIds).subscribe(
          details => {
            this.workItemList = details;
            console.log('list recieved is',this.workItemList )
          },
          error => {
            this.showErrorMessage = true;
            this.errorMessage = 'unable to fetch the Work Item List.Please try again.';
            console.error('Error fetching work item details:', error);
            this.errorMessages.push( this.errorMessage);
          }
        );
      },
      error => {
        this.showErrorMessage = true;
        console.error('Error fetching work items:', error);
        this.errorMessage = 'unable to fetch the Work Item.Please try again.'
        this.errorMessages.push(this.errorMessage);
      }
    );
  }
  /**
   * Use to get the array of children of a given work item.
   */
  showChildren(){
    if(this.workItem.relations!== undefined)
      {
        this.lstWorkItems = [];
        this.workItem.relations.forEach(element => {
          if(element.attributes.name === 'Child')
            {
              let id = element.url.substring(element.url.lastIndexOf('/') + 1)
              this.azureService.getWorkItem(Number(id)).subscribe(
              workItem => this.lstWorkItems.push(workItem),
              error =>{
                this.showErrorMessage = true;
                this.errorMessage = 'unable to fetch the Work Item.Please try again.';
                this.errorMessages.push(this.errorMessage);
              }
              )
            }  
        });
      }
   
  }
  }

