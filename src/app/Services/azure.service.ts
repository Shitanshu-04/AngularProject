import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { WorkItem } from '../Models/workItem';
import { map } from 'rxjs';
import { ListWorkItem } from '../Models/listWorkItem';

@Injectable({
  providedIn: 'root'
})
export class AzureService {
  private accessToken = '7xaqckyqgknpszuywkkjqgqi64zmsvku2c7zsksmnuaydzd36nca';
  private baseUrl = 'https://dev.azure.com/shitanshushekharjha/Migration';
  private apiVersion = '6.0';
  private project = 'Migration'; 


  constructor(private http: HttpClient) { }

  /**
   * this end point fetches the list of work items using the workitem Id's passed.
   * @param workItemIds 
   * @returns 
   */
  getWorkItems(workItemIds: number[]): Observable<ListWorkItem> {
    const ids = workItemIds.join(',');
    const url = `${this.baseUrl}/_apis/wit/workitems?ids=${ids}&api-version=${this.apiVersion}&$expand=relations`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(':' + this.accessToken)}`
    });

    return this.http.get<ListWorkItem>(url, { headers });
  }

  /**
   * this end point fetches a single work item using the work item id passed.
   * @param workItemId 
   * @returns 
   */
  getWorkItem(workItemId: number): Observable<WorkItem> {
    const url = `${this.baseUrl}/_apis/wit/workitems/${workItemId}?api-version=${this.apiVersion}&$expand=relations`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(':' + this.accessToken)}`
    });

    return this.http.get<WorkItem>(url, { headers });
  }

  /**
   * gets all the work item Id's that are present in a project.
   * @returns 
   */
  getWorkItemsId(): Observable<any> {
    const url = `${this.baseUrl}/_apis/wit/wiql?api-version=${this.apiVersion}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(':'+this.accessToken) // Replace with your PAT
    });

    const query = {
      query: `SELECT [System.Id] FROM workitems WHERE [System.TeamProject] = '${this.project}' ORDER BY [System.Id]`
    };

    return this.http.post<any>(url, query, { headers });
  }
}

