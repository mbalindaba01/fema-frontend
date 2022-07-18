import './style.css'
import Alpine from 'alpinejs';
import { Users } from './users';
import { Services } from './services'

window.Alpine = Alpine;


Alpine.data('users', Users);
Alpine.data('services', Services)

Alpine.start();
