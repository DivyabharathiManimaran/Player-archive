import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { DisplayProfile, PlayerDetails, PlayerInfo } from "../models/player";
import { HomeComponentService } from "../service/home-component.service";

@Component({
    selector:"home-component",
    templateUrl:"./home-component.html",
    styleUrls:["./home-component.scss"],
    animations: [
        trigger('appearIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('600ms', style({ opacity: 1 })),
              ]),
        ]),
        trigger('flyInOut', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
              style({ transform: 'translateX(-100%)' }),
              animate(600)
            ])
          ])
      ]
})

export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {

    playerSearchForm !: FormGroup;
    playerNameVal?: string;
    active:boolean = false;
    showResult:boolean = false;
    displayDetail?:DisplayProfile;
    showSearch: boolean = false;
    unavailable: boolean = false;
    prevPlayer:string ='';
    playerDataSub?:Subscription;
    playerProfileSub?: Subscription;

    constructor( private readonly homeComponentService: HomeComponentService,
        public cdr: ChangeDetectorRef,
        private readonly fb: FormBuilder ) {}

    ngOnInit() {
        this.playerSearchForm = this.fb.group({
            playerName: new FormControl('',Validators.pattern("[a-zA-Z][a-zA-Z0-9 ]*")),
        });
    }
    ngAfterViewInit() {
        setTimeout(()=> {
            this.showSearch = true;
        },600);
        this.cdr.detectChanges();
    }

    get getForm(){
        return this.playerSearchForm.controls;
    }

    search() {
        if(this.playerNameVal) {
            this.playerNameVal = this.playerNameVal.trim();
            /** If to reduce repetition of API call when same player is searched consecutively */
            if(this.playerNameVal !== this.prevPlayer) {
                this.showResult=false;
                this.prevPlayer = this.playerNameVal;
                this.playerDataSub = this.homeComponentService.getPlayerData(this.playerNameVal.toLowerCase()).subscribe((playerInfo : PlayerInfo) => {
                    this.showResult=true;
                    if(playerInfo && playerInfo.active && playerInfo.active === "true") {
                        this.fetchPlayerDetails(playerInfo["profile-id"]);
                    } else {
                        this.active=false;
                        this.unavailable = true;
                    }
                },()=> {
                    this.showResult=true;
                    this.active=false;
                    this.unavailable = true;         
                    console.log("Something went wrong with the PLAYER DATA API");
                });
            }
        }
    }

    fetchPlayerDetails(profileId:string) { 
        this.playerProfileSub = this.homeComponentService.getPlayerProfile(profileId).subscribe((playerDetails:PlayerDetails) => {
            if(playerDetails) {
                this.active=true;
                this.unavailable = false;
                this.displayDetail = {
                    id: playerDetails.id,
                    active: 'true',
                    age: playerDetails.profile.age,
                    role: playerDetails.profile.role,
                    team: playerDetails.profile.team
                }
                console.log(this.displayDetail);
            } 
        },() => {
            console.log("Something went wrong with the PLAYER PROFILE API");
        })

    }

    
    ngOnDestroy() {
        if(this.playerDataSub)this.playerDataSub.unsubscribe();
        if(this.playerProfileSub)this.playerProfileSub.unsubscribe();
    }

}