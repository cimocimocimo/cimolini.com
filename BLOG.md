# Review of building cimolini.com portfolio site

Overview of how I built my JAM Stack website
- Infrastructure/provisioning
- Development environment
- Deployment
- Design
- Accessibility

## Infrastructure

Hosted in AWS, using S3 static site hosting.

Provisioning with Terraform

State stored in an S3 bucket

## Development Environment

JAM Stack site using Gridsome and Strapi

## Deployment

s3-sync or something?

## Design

### Content first approach

Based off the standard structure of a resume. I figured it should have these sections:

#### Objective
Should be a title and a paragraph or two of text. Also should be targeted at an employer or client and fetched using a key.

#### Qualifications

Word salad of technologies and general qualifications. Title/abbreviation with a very short description. Link to applicable experience/education?

#### Education

- When? date range or single date
- Institution
- Program
- Credential
- text
- highligts (multiple)

#### Experience

Similar to Education, date range, company/client, descripion, highlights.

#### References

## Getting Strapi rich text fields to work in Gridsome

Strapi stores rich text as markdown in the database. Gridsome only outputs the raw markdown.

https://github.com/markedjs/marked

Using that in a vue method to format the text as html.
