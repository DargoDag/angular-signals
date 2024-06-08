import {ChangeDetectionStrategy, Component, computed, inject, Signal, WritableSignal} from '@angular/core';

import {Issue} from "../../models/issue";
import {IssuesApiService} from "../../services/issues-api.service";
import {IssueComponent} from "./issue/issue.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [IssueComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  private issuesApiService = inject(IssuesApiService);
  public issues: WritableSignal<Issue[]> = this.issuesApiService.issues;

  numCheckboxesSelected: Signal<number> = computed(() => this.issues().filter(issue => issue.checked).length);
  mainCheckboxState = computed(() => {
    const issues = this.issues();
    const numChecked = this.numCheckboxesSelected();
    const numNotResolved = issues.filter(issue => issue.status !== 'resolved').length;
    return numChecked === 0 ? 'unchecked' : numChecked === numNotResolved ? 'checked' : 'indeterminate';
  });

  toggleAllCheckboxes(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.issues.update(issues => issues.map(issue => {
      if (issue.status !== 'resolved') {
        return {...issue, checked};
      } else {
        return issue;
      }
    }));
  }

  handleToggleIssue(issueId: string): void {
    this.issues.update(issues => issues.map(issue => {
      if (issue.id === issueId && issue.status !== 'resolved') {
        return {...issue, checked: !issue.checked};
      }
      return issue;
    }));
  }

  trackByIssueId(issue: Issue): string {
    return issue.id;
  }
}
