import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddGateKeeperComponent } from '../../../../modals/add-gate-keeper/add-gate-keeper.component';
import { ModalService } from 'ngx-modal-ease';
import { AddGateComponent } from '../../../../modals/add-gate/add-gate.component';
import { AssignGate2GatekeeperComponent } from '../../../../modals/assign-gate-2-gatekeeper/assign-gate-2-gatekeeper.component';
import { ApiserviceService } from '../../../../services/api/apiservice.service';
import { AssociationServiceService } from '../../../../services/association/association-service.service';
import { TableService } from '../../../../services/tableservice.service';

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
    private AssociationService: AssociationServiceService
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
        actionD : 'Assign'
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
        actionD : 'Unassign'
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
}
