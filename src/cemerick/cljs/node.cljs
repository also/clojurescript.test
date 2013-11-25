(ns cemerick.cljs.node
  (:require [cemerick.cljs.test :as test]))

(defn- run
  [f args]
  (test/enable-console-print!)
  (let [results (apply f args)]
    ((aget js/process "exit") (if (test/successful? results) 0 1))))

(defn ^:export run-tests
  [& namespaces]
  (run test/run-tests* (map symbol namespaces)))

(defn ^:export run-all-tests
  [& args]
  (run test/run-all-tests (map re-pattern args)))