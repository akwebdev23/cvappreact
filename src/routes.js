import Home from "./pages/Home"
import Login from "./pages/Login"
import Contacts from "./pages/Contacts"
import Projects from "./pages/Projects"
import Project from "./pages/Project"
import Admin from "./pages/Admin"
import Registration from "./pages/Registration"
import Skills from "./pages/Skills"
import Skill from "./pages/Skill"

import { 
    ADMIN_ROUTE,
    CONTACTS_ROUTE, 
    EXPERIENCE_ROUTE, 
    LOGIN_ROUTE, 
    REGISTRATION_ROUTE, 
    SKILLS_ROUTE, 
    HOME_ROUTE} from "./utils/consts"

export const adminRoutes = [
    {path : ADMIN_ROUTE, Component: Admin, ROLES: ['ROLE_ADMIN']},
]
export const publicRoutes = [
    {path : HOME_ROUTE, Component: Home},
    {path : LOGIN_ROUTE, Component: Login},
    {path : REGISTRATION_ROUTE, Component: Registration},
    {path : SKILLS_ROUTE, Component: Skills},
    {path : SKILLS_ROUTE + '/:id', Component: Skill},
    {path : EXPERIENCE_ROUTE, Component: Projects},
    {path : EXPERIENCE_ROUTE + '/:id', Component: Project},

    {path : CONTACTS_ROUTE, Component: Contacts},
]