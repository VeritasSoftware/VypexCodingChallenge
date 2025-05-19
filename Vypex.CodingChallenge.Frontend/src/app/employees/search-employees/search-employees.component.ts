import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-search-employees',
  imports: [
    NzFormModule,
    NzButtonComponent,
    NzInputModule,
    NzIconModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-employees.component.html',
  styleUrl: './search-employees.component.scss',
  standalone: true
})
export class SearchEmployeesComponent implements OnInit {

  onSearch = output<string>();
  onRefresh = output<void>();
  onError = output<any>();

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    searchName: this.fb.nonNullable.control("")
  })

  ngOnInit(): void {
    this.form.setValue({ searchName: "" }); // Reset search name.
  }

  search() {
    let searchName = this.form.value.searchName!;
    if (searchName.length === 0) {
      this.onError.emit({ message: 'Search name cannot be empty.' });
      return;
    }

    if (searchName.length < 3) {
      this.onError.emit({ message: 'Search name must be at least 3 characters long.' });
      return;
    }

    this.onSearch.emit(searchName); // Emit event to parent component.
  }

  onEnter() {
    this.search();
  }

  refresh() {
    this.form.setValue({ searchName: "" }); // Reset search name.
    this.onRefresh.emit(); // Emit event to parent component.
  }
}
