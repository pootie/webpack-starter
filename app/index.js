import component from './component';
import 'purecss';
import 'font-awesome/css/font-awesome.css';
import './main.css';
import { bake } from './shake';
import 'vue';

bake();

document.body.appendChild(component());
