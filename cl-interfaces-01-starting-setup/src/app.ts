abstract class Department {
    static fiscalYear = 2021;
    // private name: string;
    protected employees: string[] = [];

    protected constructor(protected readonly id: string, public name: string) {
        // this.name = n;
    }

    static createEmployee(name: string) {
        return {name: name};
    }

    abstract describe(this: Department): void;

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

    describe() {
        console.log('IT Department ' + this.id);
    }
}

// Accounting Department
class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("no report found!");
    }

    set mostRecentReport(value: string) {
        this.addReport(value);
    }

   private constructor(id: string, private readonly reports: string[]) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    describe() {
        console.log('Accounting Department - ID ', this.id)
    }

    addEmployee(name: string) {
        if (name === 'Fitz') {
            return
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text[0];
    }

    printReports() {
        console.log(this.reports);
    }
}

const it = new ITDepartment('d1', ['Fitz']);

const employee1 = Department.createEmployee('Phil');
console.log(employee1, Department.fiscalYear);

it.addEmployee('Fitz');
it.addEmployee('Beda');

// accounting.addEmployees[2] = "Peter";

it.describe();
it.printEmployeeInformation();

console.log(it);

const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting);
console.log(accounting2);

accounting.mostRecentReport = 'Year End Report';

console.log(accounting.mostRecentReport);

accounting.addReport('Something went wrong...');
accounting.addEmployee('Fitz');
accounting.addEmployee('Danny');

accounting.printReports();

console.log(accounting);

accounting.describe();

// const accountingCopy = { name: 'Dummy', describe: accounting.describe};
//
// accountingCopy.describe();











