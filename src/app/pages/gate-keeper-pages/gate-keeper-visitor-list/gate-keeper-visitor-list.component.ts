import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';

@Component({
  selector: 'app-gate-keeper-visitor-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './gate-keeper-visitor-list.component.html',
  styleUrl: './gate-keeper-visitor-list.component.css',
})
export class GateKeeperVisitorListComponent {
  user_id = localStorage.getItem('user_id');
  spotVisitorlist1;
  spotvisitorlist2: any;
  tableLoading: boolean = true;
  pages: any;
  associationId: any;

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService
  ) {
    this.spotVisitorlist1 = new TableService();
    this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
  }

  ngOnInit(): void {
    const userdata = localStorage.getItem('userdata');

    if (userdata) {
      const parsedData = JSON.parse(userdata);
      this.associationId = parsedData._id; 
    } else {
    }
    this.ListVisitorinGateKeeper('gate_visitor_entry');

    this.AssociationService.PropertyStatus$.subscribe((AddProperty) => {
      if (AddProperty) {
        this.ListVisitorinGateKeeper('gate_visitor_entry');
      }
    });
  }

  Addproperty() {
    this.ModalService.open(AddPropertyComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  viewproperty(data: any) {
    this.route.navigateByUrl(`Association/view-properties/${data}`);
  }

  ListVisitorinGateKeeper(data: any) {
    this.apiService.ListVisitorinGateKeeper<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.spotvisitorlist2 = res.data;
          this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
          this.pages = Array.from(
            { length: this.spotvisitorlist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.spotvisitorlist2 = [];
          this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
          this.tableLoading = false;
        }
      },
      error: (err: any) => {
        this.spotvisitorlist2 = [];
        this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
        this.tableLoading = false;
      },
    });
  }
}
