import './scss/styles.scss';
import Person from './Person';

const p = new Person('swatantra');
setTimeout(() => {
    alert(p.sayHello());
},500);
