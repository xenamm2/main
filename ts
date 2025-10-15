-- // 🔹 Services
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- // 🔹 Notification System
local function showNotification(message)
    local notification = Instance.new("TextLabel")
    notification.Size = UDim2.new(0, 300, 0, 50)
    notification.Position = UDim2.new(0.5, -150, 0.1, 0)
    notification.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
    notification.TextColor3 = Color3.fromRGB(255, 255, 255)
    notification.Text = message
    notification.TextScaled = true
    notification.Font = Enum.Font.GothamBold
    notification.Parent = playerGui

    local uiCorner = Instance.new("UICorner")
    uiCorner.CornerRadius = UDim.new(0, 12)
    uiCorner.Parent = notification

    TweenService:Create(notification, TweenInfo.new(0.5), {Position = UDim2.new(0.5, -150, 0.15, 0)}):Play()
    wait(2.5)
    TweenService:Create(notification, TweenInfo.new(0.5), {Position = UDim2.new(0.5, -150, -0.2, 0)}):Play()
    wait(0.5)
    notification:Destroy()
end

-- // 🔹 Fake functions (use notifications instead of errors)
_G.TradeScam = function()
    showNotification("⚠️ Trade Scam Activated!")
end

_G.TradeFreeze = function()
    showNotification("❄️ Trade Freeze Activated!")
end

-- // 🔹 Loading Screen
local loadingGui = Instance.new("ScreenGui")
loadingGui.IgnoreGuiInset = true
loadingGui.ResetOnSpawn = false
loadingGui.Parent = playerGui

local loadingFrame = Instance.new("Frame")
loadingFrame.Size = UDim2.new(1, 0, 1, 0)
loadingFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 30)
loadingFrame.Parent = loadingGui

local progressBar = Instance.new("Frame")
progressBar.Size = UDim2.new(0.8, 0, 0.05, 0)
progressBar.Position = UDim2.new(0.1, 0, 0.75, 0)
progressBar.BackgroundColor3 = Color3.fromRGB(50, 50, 70)
progressBar.Parent = loadingFrame

local progressFill = Instance.new("Frame")
progressFill.Size = UDim2.new(0, 0, 1, 0)
progressFill.BackgroundColor3 = Color3.fromRGB(80, 120, 200)
progressFill.Parent = progressBar

local statusText = Instance.new("TextLabel")
statusText.Size = UDim2.new(1, 0, 0.1, 0)
statusText.Position = UDim2.new(0, 0, 0.6, 0)
statusText.BackgroundTransparency = 1
statusText.TextColor3 = Color3.fromRGB(200, 200, 220)
statusText.TextScaled = true
statusText.Text = "Initializing..."
statusText.Font = Enum.Font.GothamBold
statusText.Parent = loadingFrame

spawn(function()
    for i = 0, 10 do -- ⏱ 10 seconds loading
        wait(1)
        local progress = math.min(i / 10, 1)
        TweenService:Create(
            progressFill,
            TweenInfo.new(0.5, Enum.EasingStyle.Sine, Enum.EasingDirection.Out),
            {Size = UDim2.new(progress, 0, 1, 0)}
        ):Play()
        statusText.Text = "Initializing... " .. math.floor(progress * 100) .. "%"
    end
    loadingGui:Destroy()
end)

-- // 🔹 Main Menu UI
local screenGui = Instance.new("ScreenGui")
screenGui.Parent = playerGui
screenGui.Enabled = false -- stays hidden until loading finishes

task.delay(11, function() -- wait until loading finishes
    screenGui.Enabled = true
end)

local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 260, 0, 220) -- smaller UI
frame.Position = UDim2.new(0.5, -130, 0.5, -110)
frame.BackgroundColor3 = Color3.fromRGB(40, 40, 60)
frame.BorderSizePixel = 0
frame.ClipsDescendants = true -- keeps inside curved
frame.Parent = screenGui

local uiCorner = Instance.new("UICorner")
uiCorner.CornerRadius = UDim.new(0, 28)
uiCorner.Parent = frame

-- // Title bar
local titleBar = Instance.new("Frame")
titleBar.Size = UDim2.new(1, 0, 0, 40)
titleBar.BackgroundColor3 = Color3.fromRGB(50, 50, 80)
titleBar.BorderSizePixel = 0
titleBar.Parent = frame

local titleText = Instance.new("TextLabel")
titleText.Size = UDim2.new(1, -40, 1, 0)
titleText.Position = UDim2.new(0, 10, 0, 0)
titleText.BackgroundTransparency = 1
titleText.Text = "🔥 Trade Menu"
titleText.TextColor3 = Color3.fromRGB(220, 220, 240)
titleText.TextScaled = true
titleText.Font = Enum.Font.GothamBold
titleText.TextXAlignment = Enum.TextXAlignment.Left
titleText.Parent = titleBar

-- 🔹 Collapse Button (^)
local collapseBtn = Instance.new("TextButton")
collapseBtn.Size = UDim2.new(0, 30, 0, 30)
collapseBtn.Position = UDim2.new(1, -35, 0.5, -15)
collapseBtn.BackgroundTransparency = 1
collapseBtn.Text = "^"
collapseBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
collapseBtn.TextScaled = true
collapseBtn.Font = Enum.Font.GothamBold
collapseBtn.Parent = titleBar

local collapsed = false
local fullSize = UDim2.new(0, 260, 0, 220)
local collapsedSize = UDim2.new(0, 260, 0, 40)

collapseBtn.MouseButton1Click:Connect(function()
    collapsed = not collapsed
    local newSize = collapsed and collapsedSize or fullSize
    TweenService:Create(frame, TweenInfo.new(0.4, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = newSize}):Play()
    local rotation = collapsed and 180 or 0
    TweenService:Create(collapseBtn, TweenInfo.new(0.3), {Rotation = rotation}):Play()
end)

-- // Buttons
local function createButton(name, posY, callback)
    local btn = Instance.new("TextButton")
    btn.Size = UDim2.new(0, 200, 0, 45)
    btn.Position = UDim2.new(0.5, -100, posY, 0)
    btn.BackgroundColor3 = Color3.fromRGB(80, 120, 200)
    btn.TextColor3 = Color3.fromRGB(255, 255, 255)
    btn.TextScaled = true
    btn.Font = Enum.Font.GothamBold
    btn.Text = name
    btn.Parent = frame

    local btnCorner = Instance.new("UICorner")
    btnCorner.CornerRadius = UDim.new(0, 12)
    btnCorner.Parent = btn

    btn.MouseButton1Click:Connect(callback)
end

createButton("Trade Scam", 0.35, function()
    _G.TradeScam()
end)

createButton("Trade Freeze", 0.55, function()
    _G.TradeFreeze()
end)
