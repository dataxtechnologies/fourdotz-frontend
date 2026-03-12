import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-association-manage-resources',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './association-manage-resources.component.html',
  styleUrl: './association-manage-resources.component.css'
})
export class AssociationManageResourcesComponent {


  constructor(private ApiService: ApiserviceService, private router: Router) { }

  columns = [
    { title: 'Lifestyle & Fitness', type: 'Facility', items: [] as any[] },
    { title: 'Clubhouse', type: 'Facility', items: [] as any[] },
    { title: 'Indoor Games', type: 'Facility', items: [] as any[] },
    { title: 'Outdoor Games', type: 'Facility', items: [] as any[] },
    { title: 'Others', type: 'Others', items: [] as any[] }
  ];

  amenities: any = {
    lifestyle: [
      { name: 'Swimming Pool', icon: 'assets/icons/amenities/swim-pool.png' },
      { name: 'Gym / Fitness Center', icon: 'assets/icons/amenities/gym.png' },
      { name: 'Yoga & Meditation', icon: 'assets/icons/amenities/yoga.png' }
    ],
    clubhouse: [
      { name: 'Clubhouse', icon: 'assets/icons/amenities/clubhouse.png' },
      { name: 'Party Hall', icon: 'assets/icons/amenities/party-hall.png' },
      { name: 'Meeting Hall', icon: 'assets/icons/amenities/meeting-hall.png' }
    ],
    indoor: [
      { name: 'Table Tennis', icon: 'assets/icons/amenities/table-tennis.png' },
      { name: 'Chess', icon: 'assets/icons/amenities/chess.png' },
      { name: 'Carrom', icon: 'assets/icons/amenities/carrom.png' }
    ],
    outdoor: [
      { name: 'Badminton', icon: 'assets/icons/amenities/badminton.png' },
      { name: 'Basketball', icon: 'assets/icons/amenities/basketball.png' },
      { name: 'Football', icon: 'assets/icons/amenities/football.png' },
      { name: 'Turf', icon: 'assets/icons/amenities/turf.png' }
    ]
  };


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const user_id = localStorage.getItem('user_id');
    this.getallresources(user_id)
  }


  resolveCategory(resource: any): string {
    const name = resource.name.toLowerCase();

    // Lifestyle & Fitness
    if (
      name.includes('Gym / Fitness Center') ||
      name.includes('fitness') ||
      name.includes('Swimming Pool') ||
      name.includes('Yoga & Meditation')
    ) {
      return 'lifestyle';
    }

    // Clubhouse
    if (
      name.includes('Clubhouse') ||
      name.includes('hall') ||
      name.includes('Party Hall') ||
      name.includes('Meeting Hall')
    ) {
      return 'clubhouse';
    }

    // Indoor Games
    if (
      name.includes('Table Tennis') ||
      name.includes('Chess') ||
      name.includes('Carrom')
    ) {
      return 'indoor';
    }

    // Outdoor Games
    if (
      name.includes('Badminton') ||
      name.includes('Basketball') ||
      name.includes('Football') ||
      name.includes('Turf')
    ) {
      return 'outdoor';
    }

    // Default
    return 'others';
  }


  getallresources(data : any) {
    this.ApiService.getallResourcesinAssociationbyID<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.mapResourcesToColumns(res.data);
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  getAmenityCategoryMap(): Record<string, string> {
    const map: Record<string, string> = {};

    Object.keys(this.amenities).forEach(category => {
      this.amenities[category].forEach((a: any) => {
        map[a.name.toLowerCase()] = category;
      });
    });

    return map;
  }

  mapResourcesToColumns(resources: any[]) {

    // Reset columns
    this.columns.forEach(col => col.items = []);

    const categoryMap = this.getAmenityCategoryMap();

    resources.forEach(resource => {

      const resourceName = resource.name.toLowerCase();
      const resolvedCategory = categoryMap[resourceName];

      switch (resolvedCategory) {
        case 'lifestyle':
          this.columns[0].items.push(resource);
          break;

        case 'clubhouse':
          this.columns[1].items.push(resource);
          break;

        case 'indoor':
          this.columns[2].items.push(resource);
          break;

        case 'outdoor':
          this.columns[3].items.push(resource);
          break;

        default:
          this.columns[4].items.push(resource); // Others
          break;
      }
    });
  }

  createresources() {
    this.router.navigateByUrl('Association/manage-amenities/resources/create-resources');
  }

  viewResource(item: any) {
    this.router.navigateByUrl(
      `/Association/manage-amenities/resources/view-resources-details/${item.resource_id}`
    );
  }

  deleteResource(item: any) {
    if (!confirm(`Delete ${item.name}?`)) return;

    // this.ApiService.deleteResource<any>(item.resource_id).subscribe({
    //   next: (res: any) => {
    //     if (res?.success) {
    //       this.getallresources(); // refresh board
    //     }
    //   },
    //   error: () => {
    //     alert('Failed to delete resource');
    //   }
    // });
  }

  formatTime(time: any): string {
    if (!time) return '-';

    // If ISO / timestamp
    if (typeof time === 'object' && time.$date) {
      return new Date(time.$date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    // If already "6:00 AM"
    return time;
  }

  formatPricePerSlot(item: any): string {
    if (!item || item.pricing_type !== 'paid') return '';

    const price = item.price_per_hour;
    const durationMin = Number(item.slot_duration);

    if (!price || !durationMin) {
      return `₹${price}/hr`;
    }

    // Convert minutes → hours
    const hours = durationMin / 60;

    // 1 → 1 hr, 1.5 → 1.5 hr
    const hrLabel = hours % 1 === 0 ? `${hours} hr` : `${hours} hr`;

    return `₹${price} / ${hrLabel}`;
  }
}
