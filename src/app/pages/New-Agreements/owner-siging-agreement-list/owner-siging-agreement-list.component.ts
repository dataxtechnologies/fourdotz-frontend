import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { SelectAgreementToviewCreateComponent } from '../../../modals/select-agreement-toview-create/select-agreement-toview-create.component';
import { ShepherdService } from 'angular-shepherd';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/dashboard-layout.service';

@Component({
  selector: 'app-owner-siging-agreement-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-siging-agreement-list.component.html',
  styleUrl: './owner-siging-agreement-list.component.css'
})
export class OwnerSigingAgreementListComponent {
user_id = localStorage.getItem('user_id');
  spotVisitorlist1;
  spotvisitorlist2: any;
  tableLoading: boolean = true;
  pages: any;
  associationId: any;
  user_type: any;

  constructor(
    private Modal: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
        private shepherd: ShepherdService,
    private DashboardService: DashboardLayoutService,
  ) {
    this.spotVisitorlist1 = new TableService();
    this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
  }

  ngOnInit(): void {
    const userdata = localStorage.getItem('userdata');
    this.user_type = localStorage.getItem('user_type');

    if (userdata) {
      const parsedData = JSON.parse(userdata);
      this.associationId = parsedData._id;
    } else {
    }
    this.ListAgreementforusers();

    this.AssociationService.PropertyStatus$.subscribe((AddProperty) => {
      if (AddProperty) {
        this.ListAgreementforusers();
      }
    });



  }

  CreateTemplate() {
    this.route.navigateByUrl(`agreement/association/create-template`);
  }

  viewproperty(data: any) {
    this.route.navigateByUrl(`Association/view-properties/${data}`);
  }

  openagreement(data: any){
    this.route.navigateByUrl(`/agreement/owner/owner-view-signing-agreement/${data}`);
  }

  ListAgreementforusers() {
    this.apiService.ListAgreementforusers<any>().subscribe({
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

  openSelectAgreementModal() {
    this.Modal.open(SelectAgreementToviewCreateComponent, {
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


  startTour() {
    const SHOULD_RUN_TOUR = true;
    if (!SHOULD_RUN_TOUR) return;

    if (this.shepherd.tourObject) {
      this.shepherd.cancel();
    }

    this.shepherd.modal = true;

    this.shepherd.defaultStepOptions = {
      scrollTo: { behavior: 'smooth', block: 'center' },
      cancelIcon: { enabled: false },
      classes: 'shepherd-dark-theme',
    };

    this.shepherd.addSteps([
      // 1️⃣ Header
      {
        id: 'agreement-list',
        title: 'Agreement List',
        text: 'This will show all the agreement templates created by the association.',
        attachTo: { element: '#tour-list-agreement', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },

      {
        id: 'create-agreement',
        title: 'Create Agreement',
        text: 'Click here to create an agreement',
        attachTo: { element: '#tour-create-agreement', on: 'bottom' },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-btn-secondary',
            action: () => this.shepherd.back(),
          },
          {
            text: 'Finish',
            classes: 'shepherd-btn-primary',
            action: () => this.GotoTourNextpage(),
          },
        ],
      },

    ]);

    this.shepherd.start();
  }

  finishTourthispage() {
    this.SkipTourthispage();
    this.shepherd.complete();
  }

  GotoTourNextpage() {
    this.TourtoNextpage();
    this.shepherd.complete();
  }

  SkipTourthispage() {
    const payload = {
      menu: {
        ownersignagreementtour: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
        }
      },
    });
  }

  TourtoNextpage() {
    const payload = {
      menu: {
        ownersignagreementtour: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
          this.route.navigateByUrl('/Owner/request-management/list');
        }
      },
    });
  }
}
