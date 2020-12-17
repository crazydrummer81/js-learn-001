const employers = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];

let employersNames = employers.filter(emp => emp.length > 0 && emp != '')
                              .map(emp => emp.toLocaleLowerCase().trim());

const sponsors = {
    cash: [40000, 5000, 30400, 12000],
    eu: ['SRL', 'PLO', 'J&K'],
    rus: ['RusAuto', 'SBO']
};

const {cash, eu, rus} = sponsors;

const sumSponsors = [...eu, ...rus, 'unexpected sponsor'];

const calcCash = (cash = 0) => cash.reduce((a,b) => a+b);

const money = calcCash(cash);

const makeBusiness = ({cash, emp, owner = 'Sam', director = 'Victor'}) => {
    console.log(`
        We have a business. Owner: ${owner}, director: ${director}. Our budget: ${cash}. And our employers: ${emp.join(', ')}
        And we have a sponsors: ${sumSponsors.join(', ')}
        Note. Be careful with ${eu[0]}. It's a huge risk.
    `)
}

// function calcCash(own = 0) {
//     let everyCash = Array.prototype.slice.call(arguments);
//     let total = own;
//     for (let i = 0; i < everyCash[1].length; i++) {
//         total += +everyCash[1][i];
//     }
//     return total;
// }
// function calcCash2(arguments) {
//     console.log('args', args);
//     let total = own;
//     args.forEach(item => total += item);
//     return total;
// }

// let money = calcCash(null, sponsors.cash);

// function makeBusiness(owner, director, cash, emp) {
//     director = director || 'Victor';
//     let sumSponsors = sponsors.eu.concat(sponsors.rus, 'unexpected sponsor');
//     console.log('We have a business. Owner: ' + owner + ', director: ' + director + '. Our budget: ' + cash + '. And our employers: ' +
//     emp);
//     console.log('And we have a sponsors: ');
//     console.log.apply(null, sumSponsors);
//     console.log('Note. Be careful with ' + sponsors.eu[0] + ". It's a huge risk.");
// }
makeBusiness({cash: money, emp: employersNames});