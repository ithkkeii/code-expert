## How to create Kafka cluster using Strimzi
### 1. Installing Strimzi
- Head to [strimzi-kafka-operator-releases](https://github.com/strimzi/strimzi-kafka-operator/releases)
- Create a new `kafka` namespace for the Strimzi Kafka Cluster Operator.
  ```
  kubectl create ns kafka
  ```
- Modify the installation files to reference the `kafka` namespace where you will install the Strimzi Kafka Cluster Operator.
  - On Mac, use:
    ```
    sed -i '' 's/namespace: .*/namespace: kafka/' install/cluster-operator/*RoleBinding*.yaml
    ```
- Create a new `kafka-cluster` namespace where you will deploy your Kafka cluster.
  ```
  kubectl create ns kafka-cluster
  ```
- Edit the `install/cluster-operator/060-Deployment-strimzi-cluster-operator.yaml` file and set the **STRIMZI_NAMESPACE** environment variable to the namespace `kafka-cluster`.
  ```
  # ...
   env:
    - name: STRIMZI_NAMESPACE
      value: kafka-cluster
  # ...
- Give permission to the Cluster Operator to watch the `kafka-cluster` namespace.
  ```
  kubectl create -f install/cluster-operator/020-RoleBinding-strimzi-cluster-operator.yaml -n kafka-cluster
  ```
  ```
  kubectl create -f install/cluster-operator/031-RoleBinding-strimzi-cluster-operator-entity-operator-delegation.yaml -n kafka-cluster
  ```
   *The commands create role bindings that grant permission for the Cluster Operator to access the Kafka cluster.*
- Deploy the CRDs and role-based access control (RBAC) resources to manage the CRDs.
  ```
  kubectl create -f install/cluster-operator/ -n kafka
  ```
### 2. Creating a cluster
With Strimzi installed, you create a Kafka cluster, then a topic within the cluster.

When you create a cluster, the Cluster Operator you deployed when installing Strimzi watches for new Kafka resources.

**Prerequisites**
- For the Kafka cluster, ensure a Cluster Operator is deployed.
- For the topic, you must have a running Kafka cluster.

**Procedure**
- Log in to the Kubernetes cluster as a non-privileged user.
- Create a new `my-cluster` Kafka cluster with one ZooKeeper and one Kafka broker.
  - Use `persistent-claim` storage
  - Expose the Kafka cluster outside of the Kubernetes cluster using an external listener configured to use a `NodePort`.
  ```
  kubectl create -n kafka-cluster -f <path_to_your_file_yaml>
  ```
  ```
  apiVersion: kafka.strimzi.io/v1beta2
  kind: Kafka
  metadata:
    name: my-cluster
  spec:
    kafka:
      replicas: 1
      listeners:
        - name: plain
          port: 9092
          type: internal
          tls: false
        - name: tls
          port: 9093
          type: internal
          tls: true
          authentication:
            type: tls
        - name: external
          port: 9094
          type: nodeport
          tls: false
          configuration:
            brokers:
            - broker: 0
              advertisedHost: localhost
      storage:
        type: jbod
        volumes:
        - id: 0
          type: persistent-claim
          size: 100Gi
          deleteClaim: false
      config:
        offsets.topic.replication.factor: 1
        transaction.state.log.replication.factor: 1
        transaction.state.log.min.isr: 1
        default.replication.factor: 1
        min.insync.replicas: 1
    zookeeper:
      replicas: 1
      storage:
        type: persistent-claim
        size: 100Gi
        deleteClaim: false
    entityOperator:
      topicOperator: {}
      userOperator: {}
   ```
 - Wait for the cluster to be deployed:
   ```
   kubectl wait kafka/my-cluster --for=condition=Ready --timeout=300s -n kafka-cluster
   ```
 - When your cluster is ready, create a topic to publish and subscribe from your external client.
   
   Create the following `my-topic` custom resource definition with 3 partitions and replication factor 1 in the `my-cluster` Kafka cluster:
   ```
   kubectl create -n kafka-cluster -f
   ```
   ```
   apiVersion: kafka.strimzi.io/v1beta2
   kind: KafkaTopic
   metadata:
     name: my-topic
     labels:
       strimzi.io/cluster: "my-cluster"
   spec:
     partitions: 3
     replicas: 1
   ```
### 3. Sending and receiving messages from a topic

You can test your Strimzi installation by sending and receiving messages to `my-topic` from outside the cluster.

Use a terminal to run a Kafka producer and consumer on a local machine.

**Prerequisites**
- Ensure Strimzi is installed on the Kubernetes cluster.
- ZooKeeper and Kafka must be running to be able to send and receive messages.

**Procedure**
- Download the latest Kafka binaries and install Kafka on your local machine. [Apache Kafka download](https://kafka.apache.org/downloads)
- Find the port of the bootstrap service:
  ```
  kubectl get service my-cluster-kafka-external-bootstrap -n my-kafka-project -o=jsonpath='{.spec.ports[0].nodePort}{"\n"}'
  ```
- Find the IP address of the Minikube node:

  <sub>If using **Docker Desktop** using `localhost`</sub>
  ```
  kubectl get nodes --output=jsonpath='{range .items[*]}{.status.addresses[?(@.type=="InternalIP")].address}{"\n"}{end}'
  ```
- Open a terminal, and start the Kafka console producer with the topic `my-topic`:
  ```
  bin/kafka-console-producer.sh --bootstrap-server <node-address>:_<node-port>_ --topic my-topic
  ```
- Open a new terminal tab or window, and start the consumer to receive the messages:
  ```
  bin/kafka-console-consumer.sh --bootstrap-server <node-address>:_<node-port>_ --topic my-topic --from-beginning
  ```
