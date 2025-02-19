import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../core/header/header.component";
import { CategoryComponent } from "../../core/category/category.component";
import { SellButtonComponent } from "../../shared/components/sell-button/sell-button.component";
import { FooterComponent } from "../../core/footer/footer.component";
import { HomeButtonComponent } from "../../shared/components/home-button/home-button.component";

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, HeaderComponent, CategoryComponent, SellButtonComponent, FooterComponent, HomeButtonComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  rol: string = 'cliente'; // Valor por defecto

  cliente: any = {
    nombre: '',
    email: ''
  }
  
  vendedor: any = {
    negocio: '',
    email: ''
  }
  

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.rol = params.get('rol') ?? 'cliente';
    });

  
  }
}

