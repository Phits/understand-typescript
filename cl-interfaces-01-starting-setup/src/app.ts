class Department {
    // private name: string;
    protected employees: string[] = [];

    constructor(private readonly id: string, public name: string) {
        // this.name = n;
    }

    describe(this: Department) {
        console.log(`Department (${this.id})`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
}

class AccountingDepartment extends Department {
    constructor(id: string, private readonly reports: string[]) {
        super(id, 'Accounting');
        this.reports = reports;
    }

    addEmployee(name: string) {
        if (name === 'Fitz') {
            return
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }
}

const it = new ITDepartment('d1', ['Fitz']);

it.addEmployee('Fitz');
it.addEmployee('Beda');

// accounting.addEmployees[2] = "Peter";

it.describe();
it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDepartment('d2', []);

accounting.addReport('Something went wrong...');
accounting.addEmployee('Fitz');
accounting.addEmployee('Danny');

accounting.printReports();

console.log(accounting);

// const accountingCopy = { name: 'Dummy', describe: accounting.describe};
//
// accountingCopy.describe();











