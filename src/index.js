import './style.css';
import 'eventlistenerwithname';
import { createHeader } from './components/header';
import './components/Logic';

const app = document.querySelector('#app');

const header = createHeader();

app.append(header);

