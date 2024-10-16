import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Необходимо для работы с Angular
import { FormsModule } from '@angular/forms'; // Для работы с формами
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Импортируем необходимые модули
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  contact: Contact = {
    name: '',
    email: '',
    phone: {
      mobile: '',
      work: ''
    }
  };

  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    console.log('ContactListComponent initialized'); // Лог для проверки инициализации
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      console.log('Received contacts:', data); // Лог для проверки полученных данных
      this.contacts = data;
    }, error => {
      console.error('Error fetching contacts:', error); // Лог для проверки ошибок
    });
  }
  
  

  deleteContact(id: string): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter(contact => contact._id !== id);
    });
  }

  onSubmit(): void {
    if (this.selectedContact) {
      // Обновление существующего контакта
      this.contactService.updateContact(this.contact).subscribe(updatedContact => {
        const index = this.contacts.findIndex(c => c._id === updatedContact._id);
        this.contacts[index] = updatedContact;
        this.clearForm();
      });
    } else {
      // Создание нового контакта
      this.contactService.createContact(this.contact).subscribe(newContact => {
        this.contacts.push(newContact);
        this.clearForm();
      });
    }
  }

  editContact(contact: Contact): void {
    this.selectedContact = contact;
    this.contact = { ...contact };  // Клонируем данные для редактирования
  }

  clearForm(): void {
    this.selectedContact = null;
    this.contact = { name: '', email: '', phone: { mobile: '', work: '' } };
  }
}
