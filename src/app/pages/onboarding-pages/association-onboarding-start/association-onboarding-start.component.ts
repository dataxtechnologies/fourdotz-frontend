import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  isComplete: boolean;
  isActive: boolean;
}

// ─── Indian States ─────────────────────────────────────────────────────────────
const INDIAN_STATES: string[] = [
  'Tamil Nadu', 'Kerala',
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

// ─── Districts per State ───────────────────────────────────────────────────────
const STATE_DISTRICTS: Record<string, string[]> = {
  'Tamil Nadu': [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
    'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
    'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',
    'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
    'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
    'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
    'Vellore', 'Villupuram', 'Virudhunagar'
  ],
  'Kerala': [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod',
    'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
    'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
  ],
  'Karnataka': [
    'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban',
    'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga',
    'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri',
    'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur',
    'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada',
    'Vijayapura', 'Yadgir'
  ],
  'Andhra Pradesh': [
    'Alluri Sitharama Raju', 'Anakapalli', 'Anantapur', 'Bapatla', 'Chittoor',
    'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Konaseema', 'Krishna',
    'Kurnool', 'Manyam', 'Nandyal', 'NTR', 'Palnadu', 'Prakasam',
    'Sri Potti Sri Ramulu Nellore', 'Sri Sathya Sai', 'Srikakulam', 'Tirupati',
    'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'
  ],
  'Telangana': [
    'Adilabad', 'Bhadradri Kothagudem', 'Hanumakonda', 'Hyderabad', 'Jagtial',
    'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy',
    'Karimnagar', 'Khammam', 'Kumuram Bheem', 'Mahabubabad', 'Mahabubnagar',
    'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool',
    'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli',
    'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet',
    'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'
  ],
  'Maharashtra': [
    'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara',
    'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
    'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
    'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar',
    'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
    'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
  ],
  'Gujarat': [
    'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch',
    'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka',
    'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch',
    'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal',
    'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar',
    'Tapi', 'Vadodara', 'Valsad'
  ],
  'Delhi': [
    'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi',
    'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi',
    'South West Delhi', 'West Delhi'
  ],
};

// ─── Areas per District ────────────────────────────────────────────────────────
const DISTRICT_AREAS: Record<string, string[]> = {
  'Ariyalur': [
    'Ariyalur Town', 'Andimadam', 'Jayankondam', 'Sendurai',
    'T. Palur', 'Thirumanur', 'Udayarpalayam', 'Veppur'
  ],
  'Chengalpattu': [
    'Chengalpattu Town', 'Cheyyur', 'Chithamur', 'Guduvanchery', 'Karunguzhi',
    'Kelambakkam', 'Kundrathur', 'Lathur', 'Madambakkam', 'Madurantakam',
    'Manivakkam', 'Pallavaram', 'Perungalathur', 'Perungudi',
    'Singaperumal Koil', 'Tambaram', 'Tirukalukundram', 'Urapakkam',
    'Vandalur', 'Wallajabad'
  ],
  'Chennai': [
    'Adyar', 'Ambattur', 'Aminjikarai', 'Anna Nagar', 'Anna Salai',
    'Arumbakkam', 'Ashok Nagar', 'Avadi', 'Basin Bridge', 'Besant Nagar',
    'Chromepet', 'Chetpet', 'Egmore', 'Fort', 'George Town', 'Guindy',
    'Injambakkam', 'Kilpauk', 'Kodambakkam', 'Kolathur', 'Korrukupet',
    'Kotturpuram', 'Kovalam', 'Madipakkam', 'Maduravoyal', 'Mannadi',
    'Maraimalai Nagar', 'Medavakkam', 'Mogappair', 'Moulivakkam', 'Mylapore',
    'Nanganallur', 'Nungambakkam', 'Palavakkam', 'Pallavaram', 'Pammal',
    'Perambur', 'Perungudi', 'Porur', 'Puzhuthivakkam', 'Royapettah',
    'Royapuram', 'Saidapet', 'Sembakkam', 'Sholinganallur', 'Shenoy Nagar',
    'Sowcarpet', 'T. Nagar', 'Tambaram', 'Teynampet', 'Thiruvanmiyur',
    'Thoraipakkam', 'Tiruvottiyur', 'Tondiarpet', 'Vadapalani', 'Velachery',
    'Villivakkam', 'Washermanpet', 'West Mambalam'
  ],
  'Coimbatore': [
    'Coimbatore City', 'Annur', 'Arasur', 'Avinashi', 'Bodippalayam',
    'Chettipalayam', 'Ganapathy', 'Irugur', 'Karamadai', 'Kavundampalayam',
    'Kinathukadavu', 'Kovaipudur', 'Kovilpalayam', 'Kuniyamuthur', 'Madukkarai',
    'Mettupalayam', 'Nanjundapuram', 'Ondipudur', 'Othakalmandapam', 'Peelamedu',
    'Perur', 'Pollachi', 'Pongalur', 'R.S. Puram', 'Sarkar Samakulam',
    'Saravanampatti', 'Selvapuram', 'Singanallur', 'Sulur', 'Thondamuthur',
    'Tirupur Road', 'Vadavalli', 'Valparai', 'Vellalore'
  ],
  'Cuddalore': [
    'Cuddalore Town', 'Bhuvanagiri', 'Chidambaram', 'Kattumannarkoil',
    'Kurinjipadi', 'Mangalur', 'Panruti', 'Parangipettai', 'Srimushnam',
    'Tittagudi', 'Veppur', 'Virudhachalam'
  ],
  'Dharmapuri': [
    'Dharmapuri Town', 'Harur', 'Karimangalam', 'Morappur', 'Nallampalli',
    'Palacode', 'Pappireddipatti', 'Pennagaram', 'Thoppur'
  ],
  'Dindigul': [
    'Dindigul City', 'Athoor', 'Batlagundu', 'Gujiliamparai', 'Kodaikanal',
    'Natham', 'Nilakottai', 'Oddanchatram', 'Palani', 'Reddiyarchatram',
    'Shanarpatti', 'Sirumalai', 'Vadamadurai', 'Vedasandur'
  ],
  'Erode': [
    'Erode City', 'Anthiyur', 'Bhavani', 'Bhavanisagar', 'Chennimalai',
    'Chithode', 'Gobichettipalayam', 'Kadambur', 'Kodumudi', 'Modakkurichi',
    'Nambiyur', 'Perundurai', 'Sathyamangalam', 'Thalavadi'
  ],
  'Kallakurichi': [
    'Kallakurichi Town', 'Chinnaselam', 'Chinnasalem', 'Kalvarayan Hills',
    'Kariapatti', 'Minnur', 'Sankarapuram', 'Tirukoilur', 'Ulundurpet',
    'Valapady', 'Vikravandi'
  ],
  'Kancheepuram': [
    'Kancheepuram Town', 'Cheyyar', 'Egapuram', 'Karunguzhi', 'Maduranthakam',
    'Manampathi', 'Sriperumbudur', 'Uttiramerur', 'Walajabad'
  ],
  'Kanyakumari': [
    'Nagercoil', 'Agasteeswaram', 'Colachel', 'Eraniel', 'Killiyoor',
    'Kottaram', 'Kulasekharam', 'Kuzhithurai', 'Marthandam', 'Melpuram',
    'Padmanabhapuram', 'Rajakkamangalam', 'Thuckalay', 'Thiruvattar',
    'Vilavancode'
  ],
  'Karur': [
    'Karur Town', 'Aravakurichi', 'K. Paramathi', 'Kadavur', 'Krishnarayapuram',
    'Kulithalai', 'Manapparai', 'Manmangalam', 'Nerur', 'Pugalur',
    'Thanthoni', 'Thogamalai'
  ],
  'Krishnagiri': [
    'Krishnagiri Town', 'Anchetti', 'Bargur', 'Denkanikottai', 'Hosur',
    'Kaveripattinam', 'Kelamangalam', 'Mathur', 'Shoolagiri', 'Thally',
    'Uthangarai', 'Veppanapalli'
  ],
  'Madurai': [
    'Madurai City', 'Alanganallur', 'Aravakurichi', 'Chellampatti', 'Kallikudi',
    'Kottampatti', 'Madurai East', 'Madurai North', 'Madurai South', 'Madurai West',
    'Melur', 'Othakadai', 'Paravai', 'Peraiyur', 'Sholavandan',
    'Thiruparankundram', 'Thirumangalam', 'Thiruppuvanam', 'Usilampatti', 'Vadipatti'
  ],
  'Mayiladuthurai': [
    'Mayiladuthurai Town', 'Kuthalam', 'Manalmelkudi', 'Poompuhar',
    'Sembanarkoil', 'Sirkali', 'Tharangambadi', 'Tranquebar', 'Vedaranyam'
  ],
  'Nagapattinam': [
    'Nagapattinam Town', 'Keelakarai', 'Kilvelur', 'Kollidam', 'Kuttralam',
    'Pumpuhar', 'Sirkazhi', 'Tharangambadi', 'Thirumarugal', 'Velankanni',
    'Vedaranyam'
  ],
  'Namakkal': [
    'Namakkal City', 'Erumapatty', 'Kabilarmalai', 'Kollihills', 'Komarapalayam',
    'Mohanur', 'Pallipalayam', 'Paramathi-Velur', 'Puduchatram', 'Rasipuram',
    'Sendamangalam', 'Thiruchengode', 'Vennandur'
  ],
  'Nilgiris': [
    'Ooty (Udhagamandalam)', 'Coonoor', 'Gudalur', 'Kothagiri', 'Kotagiri',
    'Lovedale', 'Mettupalayam', 'Panthalur', 'Thalaikundah', 'Wellington'
  ],
  'Perambalur': [
    'Perambalur Town', 'Alathur', 'Kunnam', 'Labbaikudikadu',
    'Siruvachur', 'Thirumalapadi', 'Veppur'
  ],
  'Pudukkottai': [
    'Pudukkottai Town', 'Alangudi', 'Aranthangi', 'Avudaiyarkoil',
    'Gandarvakottai', 'Illuppur', 'Karambakudi', 'Kulathur', 'Manalmelkudi',
    'Ponnamaravathi', 'Thiruvarankulam', 'Tirumayam', 'Viralimalai'
  ],
  'Ramanathapuram': [
    'Ramanathapuram Town', 'Emaneswaram', 'Kadaladi', 'Kamudi', 'Kilakarai',
    'Mandapam', 'Mudukulathur', 'Paramakudi', 'Rajasingamangalam',
    'Rameswaram', 'Thiruvadanai', 'Tiruppullani'
  ],
  'Ranipet': [
    'Ranipet Town', 'Arakkonam', 'Arcot', 'Gudiyatham', 'Jolarpet',
    'Kaveripakkam', 'Nemili', 'Sholingur', 'Walajah'
  ],
  'Salem': [
    'Salem City', 'Attur', 'Ayothiyapattinam', 'Chinnasalem', 'Edappadi',
    'Gangavalli', 'Kadayampatti', 'Magudanchavadi', 'Mecherikuppam', 'Mettur',
    'Mettupatti', 'Namakkal Road', 'Omalur', 'Panamarathupatti', 'Rasipuram',
    'Salem Junction', 'Salem West', 'Sankagiri', 'Thalaivasal', 'Thiruchengode',
    'Valapady', 'Vanavasi', 'Veerapandi', 'Veeranam', 'Yercaud'
  ],
  'Sivaganga': [
    'Sivaganga Town', 'Devakottai', 'Ilayangudi', 'Kallal', 'Kalaiyarkoil',
    'Karaikudi', 'Manamadurai', 'Nattarasankottai', 'Pillayarpatti',
    'Singampunari', 'Tiruppathur', 'Tiruvadhurai'
  ],
  'Tenkasi': [
    'Tenkasi Town', 'Alangulam', 'Kadayam', 'Keezhapavoor', 'Kuruvikulam',
    'Pavoorchatram', 'Sankarankoil', 'Shencottah', 'Surandai', 'Veerakeralamputhur'
  ],
  'Thanjavur': [
    'Thanjavur City', 'Budalur', 'Kumbakonam', 'Needamangalam', 'Orathanadu',
    'Papanasam', 'Pattukkottai', 'Peravurani', 'Sethubavachatram',
    'Thiruvaiyaru', 'Thiruvidaimarudur'
  ],
  'Theni': [
    'Theni Town', 'Andipatti', 'Bodinayakanur', 'Chinnamanur', 'Cumbum',
    'Gudalur', 'Kambam', 'Periyakulam', 'Rajapalayam', 'Uthamapalayam'
  ],
  'Thoothukudi': [
    'Thoothukudi City', 'Eral', 'Ettayapuram', 'Kadayampattu', 'Kayalpattinam',
    'Kovilpatti', 'Ottapidaram', 'Sathankulam', 'Srivaikundam', 'Tiruchendur',
    'Tirunelveli Road', 'Vallioor', 'Vilathikulam'
  ],
  'Tiruchirappalli': [
    'Trichy City', 'Ariyamangalam', 'Golden Rock', 'Kathirvedu', 'Lalgudi',
    'Manapparai', 'Manachanallur', 'Marungapuri', 'Musiri', 'Pullambadi',
    'Srirangam', 'Thiruverumbur', 'Thottiyam', 'Thuraiyur', 'Uppiliyapuram',
    'Vaiyampatti'
  ],
  'Tirunelveli': [
    'Tirunelveli City', 'Ambasamudram', 'Cheranmahadevi', 'Kallidaikurichi',
    'Maniyachi', 'Mundakalpatti', 'Nanguneri', 'Palayamkottai', 'Pettai',
    'Puliyangudi', 'Radhapuram', 'Sankarankovil', 'Shengottai', 'Tenkasi',
    'Thachanallur'
  ],
  'Tirupathur': [
    'Tirupathur Town', 'Ambur', 'Jolarpet', 'Natrampalli', 'Vaniyambadi'
  ],
  'Tiruppur': [
    'Tiruppur City', 'Avinashi', 'Dharapuram', 'Kangeyam', 'Kolumam',
    'Madathukulam', 'Muthur', 'Palladam', 'Pongalur', 'Udumalaipettai',
    'Uthukuli', 'Veerapandi'
  ],
  'Tiruvallur': [
    'Tiruvallur Town', 'Ambattur', 'Avadi', 'Gummidipoondi', 'Ponneri',
    'Poonamallee', 'Redhills', 'Thiruvotriyur', 'Tiruttani', 'Uthukkottai'
  ],
  'Tiruvannamalai': [
    'Tiruvannamalai Town', 'Arani', 'Arni', 'Chengam', 'Cheyyar', 'Chetpet',
    'Jawadhu Hills', 'Kalasapakkam', 'Kilpennathur', 'Polur', 'Thandrampet',
    'Thellar', 'Vandavasi', 'Vembakkam'
  ],
  'Tiruvarur': [
    'Tiruvarur Town', 'Kodavasal', 'Koothanallur', 'Mannargudi', 'Muthupettai',
    'Nannilam', 'Needamangalam', 'Papanasam', 'Thiruthuraipoondi', 'Valangaiman'
  ],
  'Vellore': [
    'Vellore City', 'Ambur', 'Anaicut', 'Arcot', 'Gudiyatham', 'Jolarpet',
    'Katpadi', 'Melvisharam', 'Pernambut', 'Sholingur', 'Thirupathur',
    'Vaniyambadi', 'Walajah'
  ],
  'Villupuram': [
    'Villupuram City', 'Gingee', 'Kallakurichi', 'Mailam', 'Marakanam',
    'Melmalayanur', 'Mugaiyur', 'Sankarapuram', 'Thirukkoyilur', 'Tindivanam',
    'Ulundurpet', 'Vaitheeswaran Koil', 'Vikravandi'
  ],
  'Virudhunagar': [
    'Virudhunagar Town', 'Aruppukkottai', 'Kariapatti', 'Rajapalayam',
    'Sattur', 'Sivakasi', 'Srivilliputhur', 'Tiruchuli', 'Vembakottai', 'Watrap'
  ],
  'Alappuzha': [
    'Alappuzha Town', 'Ala', 'Ambalapuzha', 'Aroor', 'Arattupuzha',
    'Budhanoor', 'Champakulam', 'Chengannur', 'Cherthala', 'Edathua',
    'Harippad', 'Kaduthuruthy', 'Kainakary', 'Kayamkulam', 'Kuttanad',
    'Mannar', 'Mararikulam', 'Mavelikara', 'Muhamma', 'Muttar',
    'Pathirappally', 'Pulinkunnu', 'Punnapra', 'Ranny', 'Thankassery',
    'Thiruvalla', 'Thuravoor', 'Veeyapuram'
  ],
  'Ernakulam': [
    'Ernakulam City', 'Aluva', 'Angamaly', 'Cheranalloor', 'Chottanikkara',
    'Edappally', 'Fort Kochi', 'Kalady', 'Kalamassery', 'Karukutty',
    'Kochi', 'Kothamangalam', 'Manjapra', 'Maradu', 'Mattancherry',
    'Muvattupuzha', 'North Paravur', 'Palarivattom', 'Paravur', 'Perumbavoor',
    'Piravom', 'Puthencruz', 'Thrikkakara', 'Thrippunithura', 'Thiruvankulam',
    'Vadakkekkara'
  ],
  'Idukki': [
    'Idukki Town', 'Adimali', 'Azhutha', 'Devikulam', 'Elappara', 'Kattappana',
    'Kumily', 'Marayoor', 'Munnar', 'Nedumkandam', 'Painavu', 'Peermade',
    'Rajakkad', 'Thodupuzha', 'Udumbanchola', 'Vandiperiyar'
  ],
  'Kannur': [
    'Kannur City', 'Alakode', 'Anthoor', 'Cherupuzha', 'Dharmadam', 'Edakkad',
    'Iritty', 'Kakkad', 'Kalliasseri', 'Kannapuram', 'Kelakam', 'Kuthuparamba',
    'Mananthavady', 'Mattannur', 'Muzhappilangad', 'Narath', 'Nileshwaram',
    'Panoor', 'Payyannur', 'Peravoor', 'Sreekandapuram', 'Taliparamba',
    'Thana', 'Thrikaripur'
  ],
  'Kasaragod': [
    'Kasaragod Town', 'Adzholly', 'Bekal', 'Chengala', 'Cheruvathur',
    'Hosdurg', 'Kanhangad', 'Karadka', 'Manjeswaram', 'Muliyar',
    'Nileshwaram', 'Puthige', 'Rajapuram', 'Trikaripur', 'Uppala', 'Vorkady'
  ],
  'Kollam': [
    'Kollam City', 'Adichanalloor', 'Chavara', 'Chathannur', 'Chadayamangalam',
    'Eravipuram', 'Ithikkara', 'Kadakkal', 'Kottarakkara', 'Kulakkada',
    'Kundara', 'Kureepuzha', 'Mukhathala', 'Mynagappally', 'Oachira',
    'Paravur', 'Pathanapuram', 'Perinad', 'Punalur', 'Sasthamkotta', 'Thenmala'
  ],
  'Kottayam': [
    'Kottayam City', 'Ayarkunnam', 'Changanassery', 'Chirakkadavu', 'Ettumanoor',
    'Kadanad', 'Kadaplamattam', 'Kaduthuruthy', 'Kanjirapally', 'Kanjirappally',
    'Karukachal', 'Koothattukulam', 'Kumarakom', 'Meenachil', 'Moolamattom',
    'Mundakayam', 'Pampady', 'Poonjar', 'Thalayolaparambu', 'Tiruvalla',
    'Vaikom', 'Vakathanam'
  ],
  'Kozhikode': [
    'Kozhikode City', 'Azhiyur', 'Balussery', 'Beyypore', 'Chelannur',
    'Cheruvannur', 'Elathur', 'Feroke', 'Kadalundi', 'Kakkodi', 'Koyilandy',
    'Kuttiadi', 'Mavoor', 'Mukkam', 'Omassery', 'Perambra', 'Quilandy',
    'Ramanattukara', 'Thiruvambady', 'Thodannur', 'Tikkodi', 'Vatakara',
    'Vellarikundu'
  ],
  'Malappuram': [
    'Malappuram Town', 'Angadipuram', 'Areekode', 'Chelembra', 'Edappal',
    'Eramangalam', 'Kalpakanchery', 'Kottakkal', 'Kondotty', 'Manjeri',
    'Mankada', 'Maranchery', 'Nilambur', 'Pang', 'Parappanangadi',
    'Perinthalmanna', 'Ponnani', 'Thirur', 'Tirur', 'Tirurangadi', 'Tanur',
    'Vallikkunnu', 'Wandoor'
  ],
  'Palakkad': [
    'Palakkad City', 'Alathur', 'Cherpulassery', 'Chittur', 'Elappully',
    'Kalpathy', 'Kuzhalmannam', 'Mannarkkad', 'Nemmara', 'Ottapalam',
    'Pattambi', 'Puthunagaram', 'Shornur', 'Sreekrishnapuram', 'Thrithala',
    'Vadakkancherry'
  ],
  'Pathanamthitta': [
    'Pathanamthitta Town', 'Adoor', 'Anicadu', 'Aranmula', 'Chengannur',
    'Elanthoor', 'Ezhamkulam', 'Kadapra', 'Konni', 'Kozhencherry',
    'Kumbanadu', 'Mallappally', 'Pandalam', 'Pramadom', 'Ranni',
    'Seethathodu', 'Thiruvalla', 'Thottabhagom', 'Vadasserikara'
  ],
  'Thiruvananthapuram': [
    'Thiruvananthapuram City', 'Attingal', 'Balaramapuram', 'Chenkal',
    'Chirayinkeezhu', 'Kallambalam', 'Karakulam', 'Kattakada', 'Kazhakoottam',
    'Kovalam', 'Kulathoor', 'Manacaud', 'Medayil', 'Muttacaud', 'Nagaroor',
    'Nedumangad', 'Neyyattinkara', 'Panavoor', 'Pangode', 'Pattom',
    'Perumkadavila', 'Pothencode', 'Sreekaryam', 'Thumba', 'Thirumala',
    'Thiruvallam', 'Varkala', 'Venjaramoodu', 'Vithura'
  ],
  'Thrissur': [
    'Thrissur City', 'Chalakudy', 'Chavakkad', 'Cherpu', 'Edathiruthy',
    'Guruvayur', 'Irinjalakuda', 'Kadavallur', 'Kodakara', 'Kodungallur',
    'Kunnamkulam', 'Mala', 'Mathilakam', 'Mullassery', 'Mukundapuram',
    'Natika', 'Ollur', 'Pavaratty', 'Peringottukurussi', 'Punkunnam',
    'Puthukkad', 'Shornur', 'Thalappilly', 'Thrissur East', 'Thrissur West',
    'Triprayar', 'Vadakkancherry', 'Vellangallur', 'Wadakkancherry'
  ],
  'Wayanad': [
    'Kalpetta', 'Ambalavayal', 'Bathery', 'Frienda', 'Kambalakad',
    'Mananthavady', 'Meenangadi', 'Meppadi', 'Noolpuzha', 'Padinjarathara',
    'Perambra', 'Pozhuthana', 'Pulpally', 'Sulthan Bathery', 'Thariode',
    'Thirunelly', 'Thomattuchal', 'Vythiri'
  ],
  'Bengaluru Urban': [
    'Bangalore City', 'Anekal', 'Doddaballapur', 'Electronic City', 'Hoskote',
    'Indiranagar', 'Jayanagar', 'Koramangala', 'Malleshwaram', 'Nelamangala',
    'Rajajinagar', 'Whitefield', 'Yeshwanthpur'
  ],
  'Mysuru': [
    'Mysuru City', 'Heggadadevankote', 'Hunsur', 'K. R. Nagar',
    'Nanjangud', 'Periyapatna', 'T. Narasipur'
  ],
  'Mumbai City': [
    'Colaba', 'Churchgate', 'Fort', 'Dadar', 'Dharavi',
    'Grant Road', 'Matunga', 'Parel', 'Sion', 'Wadala'
  ],
  'Mumbai Suburban': [
    'Andheri', 'Bandra', 'Borivali', 'Ghatkopar', 'Kandivali',
    'Kurla', 'Malad', 'Mulund', 'Powai', 'Vikhroli'
  ],
  'Pune': [
    'Pune City', 'Baramati', 'Bhor', 'Daund', 'Haveli', 'Indapur',
    'Junnar', 'Khed', 'Maval', 'Mulshi', 'Pimpri-Chinchwad',
    'Purandar', 'Shirur', 'Velhe'
  ],
  'New Delhi': [
    'Connaught Place', 'Karol Bagh', 'Lajpat Nagar',
    'Paharganj', 'Rajendra Place', 'Safdarjung Enclave'
  ],
  'South Delhi': [
    'Chhatarpur', 'Defence Colony', 'Greater Kailash', 'Green Park',
    'Hauz Khas', 'Kalkaji', 'Malviya Nagar', 'Mehrauli', 'Saket',
    'Vasant Kunj', 'Vasant Vihar'
  ],
};

@Component({
  selector: 'app-association-onboarding-start',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './association-onboarding-start.component.html',
  styleUrl: './association-onboarding-start.component.css'
})
export class AssociationOnboardingStartComponent implements OnInit {

  user_id = localStorage.getItem('user_id');
  userData: any;
  passport_sizephoto: File | null = null;
  RentalAggrement: File | null = null;
  ChequeLeaf: File | null = null;
  Pancard: File | null = null;
  Company_proof: File | null = null;
  submitbtnloading = false;
  MAX_FILE_SIZE = 2 * 1024 * 1024;

  // ── Address dropdown state ─────────────────────────────────
  stateSearch = '';
  districtSearch = '';
  areaSearch = '';
  stateDropdownOpen = false;
  districtDropdownOpen = false;
  areaDropdownOpen = false;
  filteredStates: string[] = [];
  filteredDistricts: string[] = [];
  filteredAreas: string[] = [];
  pincodeLoading = false;
  pincodeSuccess = false;
  pincodeError = '';

  steps: Step[] = [
    { id: 1, title: 'User Inputs', subtitle: 'Provide your basic and Association details.', isComplete: false, isActive: true },
    { id: 2, title: 'Address Details', subtitle: 'Enter your registered address information.', isComplete: false, isActive: false },
    { id: 3, title: 'Document Uploads', subtitle: 'Upload required KYC and legal documents.', isComplete: false, isActive: false },
    { id: 4, title: 'Account Details', subtitle: 'Provide your bank account details.', isComplete: false, isActive: false },
    { id: 5, title: 'Review & Submit', subtitle: 'Final check before submission.', isComplete: false, isActive: false },
  ];
  currentStep = 1;

  inputForm!: FormGroup;
  addressForm!: FormGroup;
  documentForm!: FormGroup;
  accountForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiserviceService,
    private router: Router,
    private Toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForms();
    const userJson = localStorage.getItem('userdata');
    this.userData = userJson ? JSON.parse(userJson) : {};
    this.filteredStates = [...INDIAN_STATES];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.searchable-select-wrapper')) {
      this.stateDropdownOpen = false;
      this.districtDropdownOpen = false;
      this.areaDropdownOpen = false;
    }
  }

  toUpperCaseInput(event: any) {
    const value = event.target.value.toUpperCase();
    this.accountForm.get('ifsc_code')?.setValue(value, { emitEvent: false });
  }

  initializeForms(): void {
    this.inputForm = this.fb.group({
      alternate_number: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      gst_number: ['', [Validators.required, Validators.maxLength(15)]],
      registration_number: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      country: ['India', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      landmark: [''],
    });

    this.documentForm = this.fb.group({
      company_proof_type: ['', Validators.required],
      passport_size_photo: [null, Validators.required],
      rental_agreement: [null, Validators.required],
      cancelled_cheque_leaf: [null, Validators.required],
      pan_card: [null, Validators.required],
      company_proof: [null, Validators.required],
      signature: [null, Validators.required],
    });

    this.accountForm = this.fb.group({
      account_holder_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      account_number: ['', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]],
      account_type: ['', Validators.required],
      bank_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      ifsc_code: ['', [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
    });
  }

  // ════════════════════════════════════════════════════════════
  //  STATE / DISTRICT / AREA DROPDOWN
  // ════════════════════════════════════════════════════════════
  onStateSearch(): void {
    const q = this.stateSearch.toLowerCase();
    this.filteredStates = INDIAN_STATES.filter(s => s.toLowerCase().includes(q));
    this.stateDropdownOpen = true;
  }

  selectState(state: string): void {
    this.stateSearch = state;
    this.addressForm.patchValue({ state, district: '', city: '' });
    this.districtSearch = '';
    this.areaSearch = '';
    this.stateDropdownOpen = false;
    this.filteredDistricts = STATE_DISTRICTS[state] || this.generateGenericDistricts(state);
    this.filteredAreas = [];
  }

  onDistrictFocus(): void {
    if (!this.addressForm.get('state')?.value) return;
    const state = this.addressForm.get('state')?.value;
    this.filteredDistricts = STATE_DISTRICTS[state] || this.generateGenericDistricts(state);
    this.districtDropdownOpen = true;
  }

  onDistrictSearch(): void {
    const state = this.addressForm.get('state')?.value;
    if (!state) return;
    const all = STATE_DISTRICTS[state] || this.generateGenericDistricts(state);
    const q = this.districtSearch.toLowerCase();
    this.filteredDistricts = all.filter(d => d.toLowerCase().includes(q));
    this.districtDropdownOpen = true;
  }

  selectDistrict(district: string): void {
    this.districtSearch = district;
    this.addressForm.patchValue({ district, city: '' });
    this.areaSearch = '';
    this.districtDropdownOpen = false;
    this.filteredAreas = DISTRICT_AREAS[district] || this.generateGenericAreas(district);
  }

  onAreaFocus(): void {
    if (!this.addressForm.get('district')?.value) return;
    const district = this.addressForm.get('district')?.value;
    this.filteredAreas = DISTRICT_AREAS[district] || this.generateGenericAreas(district);
    this.areaDropdownOpen = true;
  }

  onAreaSearch(): void {
    const district = this.addressForm.get('district')?.value;
    if (!district) return;
    const all = DISTRICT_AREAS[district] || this.generateGenericAreas(district);
    const q = this.areaSearch.toLowerCase();
    this.filteredAreas = all.filter(a => a.toLowerCase().includes(q));
    this.areaDropdownOpen = true;
  }

  selectArea(area: string): void {
    this.areaSearch = area;
    this.addressForm.patchValue({ city: area });
    this.areaDropdownOpen = false;
  }

  private generateGenericDistricts(state: string): string[] {
    return [`${state} District 1`, `${state} District 2`, `${state} District 3`];
  }

  private generateGenericAreas(district: string): string[] {
    return [
      `${district} North`, `${district} South`, `${district} East`,
      `${district} West`, `${district} Central`, `${district} Old Town`, `${district} New Town`
    ];
  }

  // ════════════════════════════════════════════════════════════
  //  PINCODE LOOKUP
  // ════════════════════════════════════════════════════════════
  onPincodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 6);
    input.value = value;
    this.addressForm.get('pincode')?.setValue(value, { emitEvent: false });
    this.pincodeSuccess = false;
    this.pincodeError = '';
    if (value.length === 6) this.fetchPincodeDetails(value);
  }

  fetchPincodeDetails(pincode: string): void {
    this.pincodeLoading = true;
    this.pincodeSuccess = false;
    this.pincodeError = '';
    this.http.get<any[]>(`https://api.postalpincode.in/pincode/${pincode}`).subscribe({
      next: (data) => {
        this.pincodeLoading = false;
        if (data && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length) {
          const po = data[0].PostOffice[0];
          const stateName = po.State;
          const districtName = po.District;
          const areaName = po.Name;
          this.stateSearch = stateName;
          this.addressForm.patchValue({ state: stateName });
          this.filteredDistricts = STATE_DISTRICTS[stateName] || this.generateGenericDistricts(stateName);
          this.districtSearch = districtName;
          this.addressForm.patchValue({ district: districtName });
          this.filteredAreas = DISTRICT_AREAS[districtName] || this.generateGenericAreas(districtName);
          this.areaSearch = areaName;
          this.addressForm.patchValue({ city: areaName });
          this.pincodeSuccess = true;
        } else {
          this.pincodeError = 'Pincode not found. Please enter details manually.';
        }
      },
      error: () => {
        this.pincodeLoading = false;
        this.pincodeError = 'Could not fetch pincode details. Please fill manually.';
      },
    });
  }

  // ════════════════════════════════════════════════════════════
  //  NAVIGATION
  // ════════════════════════════════════════════════════════════
  goToNextStep(): void {
    if (this.currentStep === 1) {
      if (this.inputForm.invalid) { this.inputForm.markAllAsTouched(); return; }
      this.steps[0].isComplete = true;
      this.currentStep = 2;
    } else if (this.currentStep === 2) {
      if (this.addressForm.invalid) {
        this.addressForm.markAllAsTouched();
        this.Toast.error('Please fill all required address fields.', 'Validation Error');
        return;
      }
      this.steps[1].isComplete = true;
      this.currentStep = 3;
    } else if (this.currentStep === 3) {
      if (this.documentForm.invalid) {
        this.documentForm.markAllAsTouched();
        this.Toast.error('All fields are required', 'Validation Error');
        return;
      }
      this.steps[2].isComplete = true;
      this.currentStep = 4;
    } else if (this.currentStep === 4) {
      if (this.accountForm.invalid) { this.accountForm.markAllAsTouched(); return; }
      this.steps[3].isComplete = true;
      this.currentStep = 5;
    }
    this.updateStepStatus();
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepStatus();
    }
  }

  updateStepStatus(): void {
    this.steps.forEach(step => (step.isActive = step.id === this.currentStep));
  }

  // ════════════════════════════════════════════════════════════
  //  FILE UPLOADS
  // ════════════════════════════════════════════════════════════
  onFilePassportChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (!this.validateFileSize(file, 'passport_size_photo', input)) return;
      this.passport_sizephoto = file;
      this.documentForm.patchValue({ passport_size_photo: file });
    }
  }

  onFileRentalChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (!this.validateFileSize(file, 'rental_agreement', input)) return;
      this.RentalAggrement = file;
      this.documentForm.patchValue({ rental_agreement: file });
    }
  }

  onFileChequeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (!this.validateFileSize(file, 'cancelled_cheque_leaf', input)) return;
      this.ChequeLeaf = file;
      this.documentForm.patchValue({ cancelled_cheque_leaf: file });
    }
  }

  onFilePanChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (!this.validateFileSize(file, 'pan_card', input)) return;
      this.Pancard = file;
      this.documentForm.patchValue({ pan_card: file });
    }
  }

  onFileCompanyChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (!this.validateFileSize(file, 'company_proof', input)) return;
      this.Company_proof = file;
      this.documentForm.patchValue({ company_proof: file });
    }
  }

  onFileSignatureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.documentForm.patchValue({ signature: file });
      this.documentForm.get('signature')?.markAsTouched();
    }
  }

  private validateFileSize(file: File, controlName: string, inputElement: HTMLInputElement): boolean {
    if (file.size > this.MAX_FILE_SIZE) {
      this.documentForm.get(controlName)?.setErrors({ fileSize: true });
      inputElement.value = '';
      return false;
    }
    return true;
  }

  isDocumentsValid(): boolean {
    return this.documentForm.valid;
  }

  // ════════════════════════════════════════════════════════════
  //  SUBMISSION
  // ════════════════════════════════════════════════════════════
  submitInputForm(): void {
    this.submitbtnloading = true;
    const payload = {
      alternate_number: this.inputForm.value.alternate_number,
      gst_number: this.inputForm.value.gst_number,
      registration_number: this.inputForm.value.registration_number,
      country: this.addressForm.value.country,
      street: this.addressForm.value.street,
      pincode: this.addressForm.value.pincode,
      district: this.addressForm.value.district,
      city: this.addressForm.value.city,
      state: this.addressForm.value.state,
      landmark: this.addressForm.value.landmark,
      account_name: this.accountForm.value.account_holder_name,
      account_number: this.accountForm.value.account_number,
      bank_name: this.accountForm.value.bank_name,
      account_type: this.accountForm.value.account_type,
      ifsc_code: this.accountForm.value.ifsc_code,
      id: this.userData._id,
    };
    this.apiService.AssociationDataOnboard<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtnloading = false;
          this.submitDocumentForm();
        } else {
          this.submitbtnloading = false;
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.submitbtnloading = false;
        this.Toast.error(err.error.error.message, 'Failed');
      },
    });
  }

  submitDocumentForm(): void {
    this.submitbtnloading = true;
    const formData = new FormData();
    Object.keys(this.documentForm.value).forEach(key => {
      formData.append(key, this.documentForm.value[key]);
    });
    this.apiService.AssociationDocumentOnboard<FormData>(formData).subscribe({
      next: (res: any) => {
        this.submitbtnloading = false;
        if (res?.success) {
          this.Toast.success(res.message, 'Success');
          this.router.navigateByUrl('/Association/Dashboard');
        } else {
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.submitbtnloading = false;
        this.Toast.error(err.error.error.message, 'Failed');
      },
    });
  }

  onSubmit(): void {
    if (this.inputForm.invalid || this.addressForm.invalid || this.accountForm.invalid || !this.isDocumentsValid()) return;
    this.submitInputForm();
  }

  logout(): void {
    this.apiService.logoutApi<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          localStorage.clear();
          this.router.navigateByUrl('/auth/sign-in');
          this.Toast.success(res.message, 'Success');
        } else {
          this.Toast.error(res.message, 'Failed');
        }
      },
      error: (err: any) => {
        this.Toast.error(err.error.error.message, 'Failed');
      },
    });
  }
}