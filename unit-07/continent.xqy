xquery version "1.0-ml";

module namespace cont = "http://marklogic.com/hands-on-rest/constraint/continent";

import module namespace search = "http://marklogic.com/appservices/search" at "/MarkLogic/appservices/search/search.xqy";

declare option xdmp:mapping "false";

declare function cont:parse(
  $query-elem as element(),
  $options as element(search:options))
as schema-element(cts:query)
{
  <r>{
    let $continent := $query-elem/search:text/text()
    let $countries :=
      sem:sparql(
        'select ?countryIRI
         {
           ?continentIRI <http://www.w3.org/2004/02/skos/core#prefLabel> ?continentLabel .
           ?countryIRI <http://dbpedia.org/property/continent> ?continentIRI .
         }',
        map:entry("continentLabel", rdf:langString($continent, "en"))
      ) ! map:get(., "countryIRI")
    return
      cts:triple-range-query((), sem:iri("takenIn"), $countries)
  }</r>/*
};

