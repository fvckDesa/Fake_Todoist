import './document';
import createHeader from "../components/header";
import createSideBar from "../components/sidebar";
import createMain from '../components/main';

const UserInterface = (() => {
    const app = document.querySelector('#app');

    function page(){
        const header = createHeader();
        const sidebar = createSideBar();
        const main = createMain();
        const content = document.createEasyElement("div", ["content"]);
        content.append(sidebar, main);
        app.append(header, content);
    }
    return { page };
})();

export default UserInterface;
