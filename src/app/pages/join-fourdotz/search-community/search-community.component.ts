import { Component } from '@angular/core';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-community',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './search-community.component.html',
  styleUrl: './search-community.component.css'
})
export class SearchCommunityComponent {
communityName: string = '';
  associationLoading = false;
  associationList: any
  filteredAssociations: any
  constructor(private apiService: ApiserviceService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchAssociations();
  }

  fetchAssociations(): void {

    this.associationLoading = true;
    this.apiService.fetchAssociationlist<any>().subscribe({
      next: (res: any) => {
        this.associationLoading = false;
        if (res?.success && res?.data) {
          this.associationList = res.data;
          this.filteredAssociations = [...res.data];
        } else {
          this.associationList = [];
          this.filteredAssociations = [];
        }
      },
      error: () => {
        this.associationLoading = false;
        this.associationList = [];
        this.filteredAssociations = [];

      },
    });
  }
}
