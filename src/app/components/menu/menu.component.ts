import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TarjetaComponent, FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  selectedIndex: number = -1;
  selectedPorsche?: Card;

  // Método para manejar el clic en la tarjeta
  onCardSelected(index: number) {
    this.selectedIndex = index;
    this.selectedPorsche = this.listaPorsche[index];
    
    console.clear(); // Limpia la consola
    console.log(`Índice seleccionado fue: ${this.selectedIndex}`);
    console.log('Características del Porsche seleccionado:');
    console.log(this.selectedPorsche.caracteristicas.split('\n').map(item => `• ${item.trim()}`).join('\n'));
  }

  // Propiedades para el formulario
  mostrarFormulario = false;
  nuevaTarjeta: Card = {
    imagen: '',
    titulo: '',
    descripcion: '',
    caracteristicas: ''
  };

  // Propiedades para validación
  errores = {
    titulo: '',
    imagen: '',
    descripcion: '',
    caracteristicas: ''
  };

  // Estado del formulario
  formularioValido = false;

  listaPorsche: Card[] = [
    { 
      imagen: "assets/porshe.avif",
      titulo: "Porsche 911 GT3",
      descripcion: "El icónico deportivo alemán con motor atmosférico. Conocido por su rendimiento excepcional en circuitos, ofrece una experiencia de conducción pura y adrenalina en cada curva. Su motor bóxer de 4.0 litros genera una potencia impresionante, ideal para entusiastas de la velocidad y el manejo preciso.",
      caracteristicas: "Motor 4.0L bóxer\n510 CV\n0-100 km/h en 3.4s"
    },
    { 
      imagen: "assets/porshe911.png",
      titulo: "Porsche 718 Cayman",
      descripcion: "Coupé de motor central perfecto para carretera y pista. Diseñado para combinar el placer de conducir con versatilidad diaria, este modelo destaca por su agilidad y respuesta inmediata. Equipado con un motor turboalimentado que proporciona un equilibrio perfecto entre potencia y eficiencia.",
      caracteristicas: "Motor 2.0L turbo\n300 CV\nTracción trasera"
    },
    { 
      imagen: "assets/Taycan.png",
      titulo: "Porsche Taycan",
      descripcion: "El primer deportivo 100% eléctrico de Porsche. Representa la evolución hacia la movilidad sostenible sin comprometer el rendimiento. Con una aceleración electrizante y una autonomía impresionante, redefine el lujo y la innovación en el mundo de los superdeportivos eléctricos.",
      caracteristicas: "Batería 93.4 kWh\n680 CV\nAutonomía 450 km"
    }
  ];

  // Función para mostrar/ocultar el formulario
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }
  }

  // Validación en tiempo real
  validarCampo(campo: string) {
    this.errores[campo as keyof typeof this.errores] = '';
    
    switch (campo) {
      case 'titulo':
        if (!this.nuevaTarjeta.titulo.trim()) {
          this.errores.titulo = 'El título es obligatorio';
        } else if (this.nuevaTarjeta.titulo.trim().length < 3) {
          this.errores.titulo = 'El título debe tener al menos 3 caracteres';
        } else if (this.nuevaTarjeta.titulo.trim().length > 50) {
          this.errores.titulo = 'El título no puede exceder 50 caracteres';
        }
        break;
        
      case 'imagen':
        if (!this.nuevaTarjeta.imagen.trim()) {
          this.errores.imagen = 'La URL de la imagen es obligatoria';
        } else if (!this.validarUrlImagen(this.nuevaTarjeta.imagen)) {
          this.errores.imagen = 'La URL debe tener una extensión de imagen válida (.jpg, .jpeg, .png, .gif, .webp, .avif)';
        }
        break;
        
      case 'descripcion':
        if (!this.nuevaTarjeta.descripcion.trim()) {
          this.errores.descripcion = 'La descripción es obligatoria';
        } else if (this.nuevaTarjeta.descripcion.trim().length < 10) {
          this.errores.descripcion = 'La descripción debe tener al menos 10 caracteres';
        } else if (this.nuevaTarjeta.descripcion.trim().length > 200) {
          this.errores.descripcion = 'La descripción no puede exceder 200 caracteres';
        }
        break;
        
      case 'caracteristicas':
        if (!this.nuevaTarjeta.caracteristicas.trim()) {
          this.errores.caracteristicas = 'Las características son obligatorias';
        } else if (this.nuevaTarjeta.caracteristicas.trim().length < 10) {
          this.errores.caracteristicas = 'Las características deben tener al menos 10 caracteres';
        } else if (this.nuevaTarjeta.caracteristicas.trim().length > 200) {
          this.errores.caracteristicas = 'Las características no pueden exceder 200 caracteres';
        }
        break;
    }
    
    this.actualizarEstadoFormulario();
  }

  // Validar URL de imagen
  private validarUrlImagen(url: string): boolean {
    const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    const urlLower = url.toLowerCase();
    return extensionesValidas.some(ext => urlLower.includes(ext));
  }

  // Actualizar estado del formulario
  private actualizarEstadoFormulario() {
    this.formularioValido = !this.errores.titulo && 
                           !this.errores.imagen && 
                           !this.errores.descripcion &&
                           !this.errores.caracteristicas &&
                           this.nuevaTarjeta.titulo.trim() !== '' &&
                           this.nuevaTarjeta.imagen.trim() !== '' &&
                           this.nuevaTarjeta.descripcion.trim() !== '' &&
                           this.nuevaTarjeta.caracteristicas.trim() !== '';
  }

  // Validar todo el formulario
  private validarFormulario(): boolean {
    this.validarCampo('titulo');
    this.validarCampo('imagen');
    this.validarCampo('descripcion');
    this.validarCampo('caracteristicas');
    
    // Verificar si ya existe un título similar
    const tituloExistente = this.listaPorsche.find(item => 
      item.titulo.toLowerCase().trim() === this.nuevaTarjeta.titulo.toLowerCase().trim()
    );
    
    if (tituloExistente) {
      this.errores.titulo = 'Ya existe un Porsche con este título';
      this.formularioValido = false;
      return false;
    }
    
    return this.formularioValido;
  }

  // Función para agregar nueva tarjeta con validación completa
  agregarTarjeta() {
    if (this.validarFormulario()) {
      let imagenPath = this.nuevaTarjeta.imagen.trim();
      if (!imagenPath.startsWith('assets/')) {
        imagenPath = 'assets/' + imagenPath;
      }
      
      const nuevaCard: Card = {
        imagen: imagenPath,
        titulo: this.nuevaTarjeta.titulo.trim(),
        descripcion: this.nuevaTarjeta.descripcion.trim(),
        caracteristicas: this.nuevaTarjeta.caracteristicas.trim()
      };
      
      this.listaPorsche.push(nuevaCard);
      this.limpiarFormulario();
      this.mostrarFormulario = false;
      
      // Mensaje de éxito (opcional)
      console.log('Tarjeta agregada exitosamente:', nuevaCard);
    }
  }

  // Función para limpiar el formulario
  limpiarFormulario() {
    this.nuevaTarjeta = {
      imagen: '',
      titulo: '',
      descripcion: '',
      caracteristicas: ''
    };
    this.errores = {
      titulo: '',
      imagen: '',
      descripcion: '',
      caracteristicas: ''
    };
    this.formularioValido = false;
  }
}
