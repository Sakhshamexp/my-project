const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let employees = [
  { name: "Sakhsham", id: "23BAI70580" },
  { name: "Parv Gupta", id: "23BAI70205" },
  { name: "Adarsh", id: "23BAI70616" },
];

const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));

function showMenu() {
  console.log("\n==============================");
  console.log("   Employee Management System ");
  console.log("==============================");
  console.log("1. Add Employee");
  console.log("2. List Employees");
  console.log("3. Remove Employee");
  console.log("4. Exit");
}

function listEmployees() {
  if (employees.length === 0) {
    console.log("\nEmployee list is empty.");
    return;
  }
  console.log("\nCurrent Employees:");
  employees.forEach((e, i) =>
    console.log(`${i + 1}. ${e.name} (ID: ${e.id})`)
  );
}

async function addEmployee() {
  const name = await ask("Enter employee name: ");
  if (!name) {
    console.log("Name cannot be empty.");
    return;
  }

  const id = (await ask("Enter employee ID: ")).toUpperCase();
  if (!id) {
    console.log("ID cannot be empty.");
    return;
  }

  if (employees.some((e) => e.id.toUpperCase() === id)) {
    console.log(`Employee with ID ${id} already exists.`);
    return;
  }

  employees.push({ name, id });
  console.log(`Employee ${name} (ID: ${id}) added successfully.`);
}

async function removeEmployee() {
  const id = (await ask("Enter employee ID to remove: ")).toUpperCase();
  const idx = employees.findIndex((e) => e.id.toUpperCase() === id);

  if (idx === -1) {
    console.log(`No employee found with ID ${id}.`);
    return;
  }

  const removed = employees.splice(idx, 1)[0];
  console.log(`Employee ${removed.name} (ID: ${removed.id}) removed successfully.`);
}

async function main() {
  console.log("Welcome to the Employee Management System!");

  while (true) {
    showMenu();
    const choice = await ask("\nEnter your choice (1-4): ");

    if (choice === "1") await addEmployee();
    else if (choice === "2") listEmployees();
    else if (choice === "3") await removeEmployee();
    else if (choice === "4") {
      console.log("\nExiting... Goodbye!");
      rl.close();
      break;
    } else {
      console.log("Invalid choice. Please enter 1, 2, 3, or 4.");
    }
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  rl.close();
});
