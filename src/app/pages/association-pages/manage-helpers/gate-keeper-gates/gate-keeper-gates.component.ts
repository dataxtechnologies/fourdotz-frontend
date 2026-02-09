import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddGateKeeperComponent } from '../../../../modals/add-gate-keeper/add-gate-keeper.component';
import { ModalService } from 'ngx-modal-ease';
import { AddGateComponent } from '../../../../modals/add-gate/add-gate.component';
import { AssignGate2GatekeeperComponent } from '../../../../modals/assign-gate-2-gatekeeper/assign-gate-2-gatekeeper.component';
import { ApiserviceService } from '../../../../services/api/apiservice.service';
import { AssociationServiceService } from '../../../../services/association/association-service.service';
import { TableService } from '../../../../services/tableservice.service';
import { ToastrService } from 'ngx-toastr';
import { ShepherdService } from 'angular-shepherd';
import { DashboardLayoutService } from '../../../../layouts/dashboard-layout/dashboard-layout.service';

@Component({
  selector: 'app-gate-keeper-gates',
  imports: [CommonModule],
  templateUrl: './gate-keeper-gates.component.html',
  styleUrl: './gate-keeper-gates.component.css',
})
export class GateKeeperGatesComponent {
  activeTab: string = 'keeper';
  tableLoading = false;
  hasAssignedGate: boolean = false;

  Gatelist1;
  Gatelist2: any;

  GateKeeperlist1;
  GateKeeperlist2: any;

  constructor(
    private ModalService: ModalService,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private Toast: ToastrService,
    private shepherd: ShepherdService,
    private DashboardService: DashboardLayoutService,
  ) {
    this.Gatelist1 = new TableService();
    this.Gatelist1.initialize(this.Gatelist2, 10);

    this.GateKeeperlist1 = new TableService();
    this.GateKeeperlist1.initialize(this.GateKeeperlist2, 10);
  }

  ngOnInit(): void {
    this.listGate();
    this.Listgatekeeper();

    this.AssociationService.GateCreateStatus$.subscribe((res) => {
      if (res) {
        this.listGate();
      }
    });

    this.AssociationService.GateKeeperStatus$.subscribe((res) => {
      if (res) {
        this.Listgatekeeper();
      }
    });

    this.AssociationService.GateKeeperAssignedStatus$.subscribe((res) => {
      if (res) {
        this.listGate();
        this.Listgatekeeper();
      }
    });
  }

  SendmailAgain(data: any) {
    const payload = {
      username: data,
    };

    this.apiService.SendmailAgain<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.listGate();
          this.Listgatekeeper();
        } else {
          this.Toast.error(res.message, 'Failed');
        }
      },
      error: (err: any) => {
        this.Toast.error(err.error.error.message, 'Failed');
      },
    });
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  OpenAddGateKeeper() {
    this.ModalService.open(AddGateKeeperComponent, {
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
  OpenAddGate() {
    this.ModalService.open(AddGateComponent, {
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
  AssignGates(data: any) {
    this.ModalService.open(AssignGate2GatekeeperComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        gateKeeperdata: data,
        actionD: 'Assign',
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  unAssignGates(data: any) {
    this.ModalService.open(AssignGate2GatekeeperComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        gateKeeperdata: data,
        actionD: 'Unassign',
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  listGate() {
    this.apiService.listGate<any>().subscribe({
      next: (res) => {
        if (res?.success) {
          this.Gatelist2 = res.data;

          this.Gatelist1 = new TableService();
          this.Gatelist1.initialize(this.Gatelist2, 10);
        } else {
          this.Gatelist2 = [];
          this.Gatelist1 = new TableService();
          this.Gatelist1.initialize(this.Gatelist2, 0);
        }
      },
      error: (err) => {
        console.log('err', err.error.message);
        this.Gatelist2 = [];
        this.Gatelist1 = new TableService();
        this.Gatelist1.initialize(this.Gatelist2, 0);
        console.log('err', err);
      },
    });
  }

  Listgatekeeper() {
    this.apiService.Listgatekeeper<any>().subscribe({
      next: (res) => {
        if (res?.success) {
          this.GateKeeperlist2 = res.data || [];

          this.GateKeeperlist1 = new TableService();
          this.GateKeeperlist1.initialize(this.GateKeeperlist2, 10);
        } else {
          this.GateKeeperlist2 = [];
          this.GateKeeperlist1 = new TableService();
          this.GateKeeperlist1.initialize(this.GateKeeperlist2, 0);
        }
      },
      error: (err) => {
        console.log('err', err?.error?.message);
        this.GateKeeperlist2 = [];
        this.GateKeeperlist1 = new TableService();
        this.GateKeeperlist1.initialize(this.GateKeeperlist2, 0);
      },
    });
  }

  startTour() {
    const SHOULD_RUN_TOUR = true;
    if (!SHOULD_RUN_TOUR) return;

    if (this.shepherd.tourObject) {
      this.shepherd.cancel();
    }

    // this.switchTab('keeper')

    this.shepherd.modal = true;

    this.shepherd.defaultStepOptions = {
      scrollTo: { behavior: 'smooth', block: 'center' },
      cancelIcon: { enabled: false },
      classes: 'shepherd-dark-theme',
    };

    this.shepherd.addSteps([
      // 1️⃣ Header
      {
        id: 'gate-keeper-list',
        title: 'Gate Keeper List',
        text: 'This list shows the complete gate keepers list',
        attachTo: { element: '#tour-gate-keeper-list', on: 'bottom' },
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
        id: 'add-gate-keeper',
        title: 'Add Gate Keeper',
        text: 'Click here to add a new gate keeper.',
        attachTo: { element: '#tour-add-gate-keeper', on: 'bottom' },
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
        id: 'assign-gate',
        title: 'Assign / Unassign Gate',
        text: 'Click here to assign or unassign a gate to a gate keeper.',
        attachTo: { element: '#tour-assign-gate', on: 'bottom' },
        buttons: [
          {
            text: 'skip',
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
        id: 'send-mail',
        title: 'Send Mail',
        text: 'Click here to resend the welcome mail to the gate keeper.',
        attachTo: { element: '#tour-send-mail', on: 'bottom' },
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
        id: 'gate-keeper-tab',
        title: 'Gate Keeper Tab',
        text: 'This tab manage the gate keepers',
        attachTo: { element: '#tour-gate-keeper-tab', on: 'top' },
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
        id: 'gate-tab',
        title: 'Gate Tab',
        text: 'This tab manage the all the gates',
        attachTo: { element: '#tour-gate-tab', on: 'top' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => {
              this.switchTab('gate');
              this.shepherd.next();
            },
          },
        ],
      },
      {
        id: 'gate-list',
        title: 'Gate List',
        text: 'This list shows the complete gate list',
        attachTo: { element: '#tour-gate-list', on: 'top' },
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
        id: 'gate-add',
        title: 'Add Gate',
        text: 'Click here to add a new gate.',
        attachTo: { element: '#tour-add-gate', on: 'top' },
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
        id: 'delete-gate',
        title: 'Delete Gate',
        text: 'Click here to delete a gate.',
        attachTo: { element: '#tour-delete-gate', on: 'top' },
        buttons: [
           {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
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
    // this.SkipTourthispage();
    this.shepherd.complete();
  }

  GotoTourNextpage() {
    // this.TourtoNextpage();
    this.shepherd.complete();
  }
}
