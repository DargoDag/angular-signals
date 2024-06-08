import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TableComponent} from "./components/table/table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
