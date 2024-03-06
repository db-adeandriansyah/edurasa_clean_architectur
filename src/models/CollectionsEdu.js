export class CollectionsEdu {
    constructor(data) {
      this.dataReal = data.slice();
      const dataCopy = data.slice();
      this.data = dataCopy;
    }
  
    selectProperties(properties) {
      const newData = this.data.map((item) => {
        return properties.reduce((selectedItem, prop) => {
          selectedItem[prop] = item[prop];
          return selectedItem;
        }, {});
      });
      return new CollectionsEdu(newData);
    }
  
    customFilter(filterFn) {
      const newData = this.data.filter(filterFn);
      return new CollectionsEdu(newData);
    }
  
    simpleFilter(kriteriaPenyaringan) {
      return this.customFilter((item) => {
        for (const key in kriteriaPenyaringan) {
          if (item[key] != kriteriaPenyaringan[key]) {
            return false;
          }
        }
        return true;
      });
    }
    exceptFilter(kriteriaPenyaringan) {
      return this.customFilter((item) => {
        for (const key in kriteriaPenyaringan) {
          if (item[key] == kriteriaPenyaringan[key]) {
            return false;
          }
        }
        return true;
      });
    }
    setProperty(propName, propValueOrCallback) {
        this.data = this.data.map((item) => {
          if (typeof propValueOrCallback === 'function') {
            item[propName] = propValueOrCallback(item[propName]);
          } else {
            item[propName] = propValueOrCallback;
          }
          return item;
        });
        return this;
      }
      
    addProperty(propName, propValueOrCallback) {
      this.data = this.data.map((item, index) => {
        if (typeof propValueOrCallback === 'function') {
          item[propName] = propValueOrCallback(item, index);
        } else {
          item[propName] = propValueOrCallback;
        }
        return item;
      });
      return this;
    }
    countData() {
      return this.data.length;
    }
    intersectByProperty(propName, otherData) {
      const intersectedData = this.data.filter((item) =>
        otherData.some((otherItem) => otherItem[propName] === item[propName])
      );
      return new CollectionsEdu(intersectedData);
    }
    updatePropertyValues(propNames, updateFn) {
      this.data = this.data.map((item) => {
        for (const propName of propNames) {
            if (typeof updateFn === 'function' && propName in item) {
                item[propName] = updateFn(item[propName]);
            }
        }
        return item;
      });
      return this;
  }
  uniqueByProperty(propName) {
    const uniqueValues = new Set();
    const uniqueData = this.data.filter((item) => {
        const propValue = item[propName];
        if (!uniqueValues.has(propValue)) {
            uniqueValues.add(propValue);
            return true;
        }
        return false;
    });
    return new CollectionsEdu(uniqueData);
  }
  
  uniqueByProperties(propNames) {
    const uniqueValues = new Set();
    const uniqueData = this.data.filter((item) => {
        const propValues = propNames.map(propName => item[propName]);
        const joinedPropValue = propValues.join('|');
        if (!uniqueValues.has(joinedPropValue)) {
            uniqueValues.add(joinedPropValue);
            return true;
        }
        return false;
    });

    this.data = uniqueData; // Update data instance variable
    return this; // Return the current instance for chaining
}
  
  sortByProperty(propName, order = 'asc') {
  if (order !== 'asc' && order !== 'desc') {
      throw new Error("Invalid order. Use 'asc' or 'desc'.");
  }

  const sortedData = this.data.slice().sort((a, b) => {
      const propA = a[propName];
      const propB = b[propName];
      
      if (typeof propA === 'number' && typeof propB === 'number') {
          return order === 'asc' ? propA - propB : propB - propA;
      }

      if (typeof propA === 'string' && typeof propB === 'string') {
          return order === 'asc' ? propA.localeCompare(propB) : propB.localeCompare(propA);
      }

      return 0;
  });

  return new CollectionsEdu(sortedData);
  }
  calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    const yearDiff = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    let ageYears = yearDiff;
    let ageMonths = monthDiff;
    let ageDays = dayDiff;

    if (dayDiff < 0) {
      ageMonths -= 1;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (monthDiff < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
  }

  calculateAges() {
    const newData = this.data.map((item) => {
      // const age = this.calculateAge(item.dateOfBirth);
      const age = this.calculateAge(item.pd_tanggallahir);
      return { ...item, age };
    });

    return new CollectionsEdu(newData);
  }
  simpleFilterAge(kriteriaPenyaringan) {
    return this.customFilter((item) => {
      for (const key in kriteriaPenyaringan) {
        if (key === 'age' && typeof kriteriaPenyaringan.age === 'object') {
          const ageCriteria = kriteriaPenyaringan.age;
          const age = this.calculateAge(item.pd_tanggallahir);

          if (
            ('years' in ageCriteria && age.years !== ageCriteria.years) ||
            ('months' in ageCriteria && age.months !== ageCriteria.months) ||
            ('days' in ageCriteria && age.days !== ageCriteria.days)
          ) {
            return false;
          }
        } else if (item[key] !== kriteriaPenyaringan[key]) {
          return false;
        }
      }
      return true;
    });
  }
//   filterByArg(arg) {
//     if (!Array.isArray(arg)) {
//         throw new Error('Argumen harus berupa array.');
//     }

//     const filteredData = this.data.filter(item => {
//         for (const filterItem of arg) {
//             const propName = Object.keys(filterItem)[0];
//             if (item[propName] !== filterItem[propName]) {
//                 return false;
//             }
//         }
//         return true;
//     });

//     return new CollectionsEdu(filteredData);
// }
  filterByArg(arg) {
    if (!Array.isArray(arg)) {
        throw new Error('Argumen harus berupa array.');
    }

    const filterCriteria = {};

    for (const item of arg) {
        if (typeof item === 'object' && Object.keys(item).length === 1) {
            const propName = Object.keys(item)[0];
            filterCriteria[propName] = item[propName];
        }
    }

    const filteredData = this.data.filter(item => {
        for (const prop in filterCriteria) {
            if (item[prop] !== filterCriteria[prop]) {
                return false;
            }
        }
        return true;
    });

    return new CollectionsEdu(filteredData);
}
}
/**contoh penggunaan intersect 
const data1 = [
  { id: 1, nama: 'John', kelas: '12A' },
  { id: 2, nama: 'Jane', kelas: '12B' },
  { id: 3, nama: 'Alice', kelas: '11A' },
  { id: 4, nama: 'Bob', kelas: '11B' },
  { id: 5, nama: 'Eve', kelas: '12A' },
];

const data2 = [
  { id: 6, nama: 'Mike', kelas: '12A' },
  { id: 7, nama: 'Linda', kelas: '11B' },
  { id: 8, nama: 'David', kelas: '11C' },
];

const collections1 = new CollectionsEdu(data1);
const collections2 = new CollectionsEdu(data2);

const hasil = collections1.intersectByProperty('kelas', data2).selectProperties(['nama', 'kelas']);

console.log(hasil.data);
hasilnya:
--------------------------------------
[
  { nama: 'John', kelas: '12A' },
  { nama: 'Bob', kelas: '11B' },
  { nama: 'Eve', kelas: '12A' },
]
-----------------------------------
*/

// addProperty(properties) {
//   this.data = this.data.map((item) => {
//     for (const propName in properties) {
//       const propValueOrCallback = properties[propName];
//       if (typeof propValueOrCallback === 'function') {
//         item[propName] = propValueOrCallback(item[propName]);
//       } else {
//         item[propName] = propValueOrCallback;
//       }
//     }
//     return item;
//   });
//   return this;
// }
// addProperty(propName, propValueOrCallback) {
//     this.data = this.data.map((item) => {
//       if (typeof propValueOrCallback === 'function') {
//         item[propName] = propValueOrCallback(item[propName]);
//       } else {
//         item[propName] = propValueOrCallback;
//       }
//       return item;
//     });
//     return this;
//   }
// Method lainnya bisa ditambahkan di sini
  
