import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsModule } from '../gifs/gifs.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from './components/lazyImage/lazyImage.component';

@NgModule({
  declarations: [SidebarComponent, LazyImageComponent],
  imports: [CommonModule],
  //aqui los componente de exportan para utilzarlo en otro componente
  exports: [SidebarComponent, LazyImageComponent],
})
export class SharedModule {}
