import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import os

os.makedirs("data", exist_ok=True)

transforms = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), 
                         (0.5, 0.5, 0.5))
])

train_dataset = datasets.CIFAR10(
    root="data/",
    train=True,
    download=True,
    transform=transforms
)

test_dataset = datasets.CIFAR10(
    root="data/",
    train=False,
    download=True,
    transform=transforms
)

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader  = DataLoader(test_dataset,  batch_size=64, shuffle=False)

print(f"Train size : {len(train_dataset)}")
print(f"Test size  : {len(test_dataset)}")
print(f"Batch shape: {next(iter(train_loader))[0].shape}")
 