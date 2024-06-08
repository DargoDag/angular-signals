import {ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {NgClass} from "@angular/common";

import {Issue} from "../../../models/issue";

@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [NgClass],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueComponent {
  issue: InputSignal<Issue> = input.required<Issue>();

  toggleIssueSignal: OutputEmitterRef<void> = output();

  handleToggleIssue(event: Event): void {
    event.stopPropagation();
    this.toggleIssueSignal.emit();
  }
}

