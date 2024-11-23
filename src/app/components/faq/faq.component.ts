import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  // Lógica para mostrar y ocultar preguntas frecuentes
  faqs = [
    {
      question: '¿Cómo funciona el sistema de recomendaciones personalizadas?',
      answer: 'Te pedimos información sobre tus objetivos de salud y bienestar para ofrecerte un plan hecho a medida.',
      isOpen: false
    },
    {
      question: '¿NutriMentor cuenta con profesionales de la salud?',
      answer: 'Sí, trabajamos con nutricionistas y expertos en salud para garantizar la calidad de nuestras recomendaciones.',
      isOpen: false
    },
    {
      question: '¿Cómo puedo acceder a los suplementos de calidad?',
      answer: 'Puedes acceder a ellos desde nuestra plataforma, donde ofrecemos una amplia gama de productos verificados.',
      isOpen: false
    }
  ];

  toggleAnswer(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
