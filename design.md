# Patient Data Portal

## Looking Patients Up

## Adding Patients
### Schema
We need to be able to save name/dob/address/status for each patient. Each patient will have a property called providers which will be a list/set of providers for the patient. We write a security rule to only return data for authenticated users that satisfy that rule.

```typescript
interface Patient {
    name: { first, middle, last },
    address: {},
    status: 'a' | 'b' | 'c'
}
```

#### Custom fields
We use a schemaless database in order to support writing custom fields, we will limit the fields to being key: string -> value: string. The UI for this will be the ability to add additional name fields at the bottom of the patient data form.

### Data flow
The patients will be added via a form-like UI component, called the patient data form. Upon completing the save the database get's written to the database. Separately a collection/dashboard component is responsible for watching the database table and updating it's view.

## Viewing and editing patients

### Dashboard and individual patient viewing
We have a table-esque dashboard that serves as the search tool for providers. They are able to search for patients by name in a search bar, but will also have an "advanced" search that provides the ability to filter for birthdates based of range and/or status.  We could have the dashboard will initially be sorted by most recent interaction, otherwise likely go for alphabetical.

We'll think about ideas for searching for custom fields later.


