defmodule UiTesting.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      UiTestingWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:ui_testing, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: UiTesting.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: UiTesting.Finch},
      # Start a worker by calling: UiTesting.Worker.start_link(arg)
      # {UiTesting.Worker, arg},
      # Start to serve requests, typically the last entry
      UiTestingWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: UiTesting.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    UiTestingWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
