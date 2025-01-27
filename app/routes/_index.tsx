import { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import ChurchesTable from "../components/ChurchesTable";
import EventsTable from "../components/EventsTable ";
import ProjectsTable from "../components/ProjectsTable";
import UsersTable from "../components/UsersTable";
import ChurchRegistrationForm from "../components/ChurchRegistrationForm";

export default function Index() {
  const [activeSection, setActiveSection] = useState("");
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 overflow-hidden">
        <Topbar />
        <main className="p-6 overflow-auto h-[calc(100vh-4rem)]">
          {activeSection === "churches" && <ChurchesTable />}
          {activeSection === "add-church" && <ChurchRegistrationForm />}
          {activeSection === "events" && <EventsTable />}
          {activeSection === "projects" && <ProjectsTable />}
          {activeSection === "users" && <UsersTable />}
        </main>
      </div>
    </div>
  );
}