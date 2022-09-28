package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/docker/docker/client"
	"github.com/segmentio/kafka-go"
)

func timeout(ch chan string) {
	time.Sleep(2 * time.Second)
	ch <- ""
}

func readFile(wd string, ch chan string) {
	for {
		resp, err := os.ReadFile(wd + "/random-string/report/result.txt")
		fmt.Println("re-read")
		if err == nil {
			ch <- string(resp)
		}
	}
}

func waitFile() string {
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	ch := make(chan string, 1)
	go readFile(wd, ch)
	go timeout(ch)

	res := <-ch
	return res
}

type ExecRes struct {
	IsSuccess bool   `json:"isSuccess"`
	Value     string `json:"value"`
	Took      string `json:"took"`
}

func main() {
	_, err := kafka.DialLeader(context.Background(), "tcp", "localhost:9092", "javascript", 0)
	if err != nil {
		log.Fatal("failed to dial leader:", err)
	}

	return
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	resp, err := cli.ContainerCreate(ctx, &container.Config{
		Image: "runner-interpret",
		Tty:   false,
	}, &container.HostConfig{
		AutoRemove: true,
		Resources: container.Resources{
			CPUPeriod: 100000, CPUQuota: 50000,
		}, Mounts: []mount.Mount{{
			Type:   mount.TypeBind,
			Source: wd + "/random-string",
			Target: "/app/dist/mounts",
		}}}, nil, nil, "")
	if err != nil {
		panic(err)
	}
	if err := cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		panic(err)
	}

	result := waitFile()
	var execRes ExecRes
	fmt.Println(result)
	if err != nil {
		panic(err)
	}
	json.Unmarshal([]byte(result), &execRes)
	fmt.Println(execRes)
}
